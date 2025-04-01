<script>
    import { onMount, onDestroy } from 'svelte';
    import { createLightweightChart } from './chartUtils';
    
    let chartContainer;
    let chart;
    let candlestickSeries;
    let volumeSeries;
    let ema50Series;
    let ema200Series;
    let rsiSeries;
    let tradeMarkers = [];
    let timeframe = '15m';
    let indicators = {
      ema50: true,
      ema200: true,
      rsi: true,
      vwap: false
    };
    
    let resizeObserver;
    let websocket;
    
    // Initialize chart
    function initChart() {
      if (!chartContainer) return;
      
      const { chart: newChart, candlestickSeries: newCandlestickSeries, volumeSeries: newVolumeSeries } = 
        createLightweightChart(chartContainer);
      
      chart = newChart;
      candlestickSeries = newCandlestickSeries;
      volumeSeries = newVolumeSeries;
      
      // Add EMA indicators
      if (indicators.ema50) {
        ema50Series = chart.addLineSeries({
          color: '#2196F3',
          lineWidth: 2,
          title: 'EMA 50'
        });
      }
      
      if (indicators.ema200) {
        ema200Series = chart.addLineSeries({
          color: '#FF1744',
          lineWidth: 2,
          title: 'EMA 200'
        });
      }
      
      // Add RSI indicator in a separate pane
      if (indicators.rsi) {
        rsiSeries = chart.addLineSeries({
          color: '#FFD600',
          lineWidth: 2,
          title: 'RSI',
          pane: 1
        });
        
        // Add RSI levels
        chart.addHorizontalLine({
          price: 70,
          color: '#FF1744',
          lineWidth: 1,
          lineStyle: 2,
          pane: 1
        });
        
        chart.addHorizontalLine({
          price: 30,
          color: '#00C853',
          lineWidth: 1,
          lineStyle: 2,
          pane: 1
        });
      }
      
      fetchChartData();
    }
    
    // Fetch historical chart data
    async function fetchChartData() {
      try {
        const [candlesRes, ema50Res, ema200Res, rsiRes, tradesRes] = await Promise.all([
          fetch(`/api/chart/candles?symbol=BTCUSDT&timeframe=${timeframe}`),
          indicators.ema50 ? fetch(`/api/indicators/ema?symbol=BTCUSDT&timeframe=${timeframe}&period=50`) : Promise.resolve(null),
          indicators.ema200 ? fetch(`/api/indicators/ema?symbol=BTCUSDT&timeframe=${timeframe}&period=200`) : Promise.resolve(null),
          indicators.rsi ? fetch(`/api/indicators/rsi?symbol=BTCUSDT&timeframe=${timeframe}`) : Promise.resolve(null),
          fetch(`/api/trades/signals?symbol=BTCUSDT&timeframe=${timeframe}`)
        ]);
        
        const candlesData = await candlesRes.json();
        
        // Update candlestick series
        candlestickSeries.setData(candlesData.candles.map(candle => ({
          time: candle.time,
          open: candle.open,
          high: candle.high,
          low: candle.low,
          close: candle.close
        })));
        
        // Update volume series
        volumeSeries.setData(candlesData.candles.map(candle => ({
          time: candle.time,
          value: candle.volume,
          color: candle.close >= candle.open ? 'rgba(0, 200, 83, 0.5)' : 'rgba(255, 23, 68, 0.5)'
        })));
        
        // Update EMA series
        if (indicators.ema50 && ema50Series) {
          const ema50Data = await ema50Res.json();
          ema50Series.setData(ema50Data.values);
        }
        
        if (indicators.ema200 && ema200Series) {
          const ema200Data = await ema200Res.json();
          ema200Series.setData(ema200Data.values);
        }
        
        // Update RSI series
        if (indicators.rsi && rsiSeries) {
          const rsiData = await rsiRes.json();
          rsiSeries.setData(rsiData.values);
        }
        
        // Add trade markers
        const tradesData = await tradesRes.json();
        tradeMarkers = tradesData.trades.map(trade => ({
          time: trade.time,
          position: trade.direction === 'long' ? 'belowBar' : 'aboveBar',
          color: trade.direction === 'long' ? '#00C853' : '#FF1744',
          shape: trade.direction === 'long' ? 'arrowUp' : 'arrowDown',
          text: `${trade.direction.toUpperCase()} @ ${trade.price}`
        }));
        
        tradeMarkers.forEach(marker => {
          candlestickSeries.setMarker(marker);
        });
        
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    }
    
    // Connect to WebSocket for real-time updates
    function connectWebSocket() {
      websocket = new WebSocket('wss://your-api-endpoint/ws/chart');
      
      websocket.onopen = () => {
        websocket.send(JSON.stringify({
          action: 'subscribe',
          symbol: 'BTCUSDT',
          timeframe: timeframe
        }));
      };
      
      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.type === 'candle_update') {
          // Update the last candle or add a new one
          candlestickSeries.update({
            time: data.candle.time,
            open: data.candle.open,
            high: data.candle.high,
            low: data.candle.low,
            close: data.candle.close
          });
          
          volumeSeries.update({
            time: data.candle.time,
            value: data.candle.volume,
            color: data.candle.close >= data.candle.open ? 'rgba(0, 200, 83, 0.5)' : 'rgba(255, 23, 68, 0.5)'
          });
        } else if (data.type === 'indicator_update') {
          if (data.indicator === 'ema50' && ema50Series) {
            ema50Series.update(data.value);
          } else if (data.indicator === 'ema200' && ema200Series) {
            ema200Series.update(data.value);
          } else if (data.indicator === 'rsi' && rsiSeries) {
            rsiSeries.update(data.value);
          }
        } else if (data.type === 'trade_signal') {
          const marker = {
            time: data.time,
            position: data.direction === 'long' ? 'belowBar' : 'aboveBar',
            color: data.direction === 'long' ? '#00C853' : '#FF1744',
            shape: data.direction === 'long' ? 'arrowUp' : 'arrowDown',
            text: `${data.direction.toUpperCase()} @ ${data.price}`
          };
          
          candlestickSeries.setMarker(marker);
          tradeMarkers = [...tradeMarkers, marker];
        }
      };
      
      websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
      
      websocket.onclose = () => {
        setTimeout(connectWebSocket, 5000);
      };
    }
    
    // Change timeframe
    function changeTimeframe(newTimeframe) {
      timeframe = newTimeframe;
      fetchChartData();
      
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        websocket.send(JSON.stringify({
          action: 'change_timeframe',
          timeframe: newTimeframe
        }));
      }
    }
    
    // Toggle indicator visibility
    function toggleIndicator(indicator) {
      indicators[indicator] = !indicators[indicator];
      
      // Reinitialize chart with new indicators
      if (chart) {
        chart.remove();
      }
      
      initChart();
    }
    
    onMount(() => {
      initChart();
      connectWebSocket();
      
      // Handle resize
      resizeObserver = new ResizeObserver(() => {
        if (chart) {
          chart.resize(chartContainer.clientWidth, chartContainer.clientHeight);
        }
      });
      
      resizeObserver.observe(chartContainer);
    });
    
    onDestroy(() => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      
      if (websocket) {
        websocket.close();
      }
      
      if (chart) {
        chart.remove();
      }
    });
  </script>
  
  <div class="chart-container">
    <div class="chart-controls mb-4 flex flex-wrap gap-2">
      <div class="timeframe-selector">
        <div class="flex rounded-md overflow-hidden">
          <button 
            class="px-3 py-1 text-sm {timeframe === '5m' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}"
            on:click={() => changeTimeframe('5m')}
          >
            5m
          </button>
          <button 
            class="px-3 py-1 text-sm {timeframe === '15m' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}"
            on:click={() => changeTimeframe('15m')}
          >
            15m
          </button>
          <button 
            class="px-3 py-1 text-sm {timeframe === '1h' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}"
            on:click={() => changeTimeframe('1h')}
          >
            1h
          </button>
          <button 
            class="px-3 py-1 text-sm {timeframe === '4h' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}"
            on:click={() => changeTimeframe('4h')}
          >
            4h
          </button>
          <button 
            class="px-3 py-1 text-sm {timeframe === '1d' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}"
            on:click={() => changeTimeframe('1d')}
          >
            1d
          </button>
        </div>
      </div>
      
      <div class="indicator-toggles ml-auto flex gap-2">
        <button 
          class="px-3 py-1 text-sm rounded {indicators.ema50 ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}"
          on:click={() => toggleIndicator('ema50')}
        >
          EMA 50
        </button>
        <button 
          class="px-3 py-1 text-sm rounded {indicators.ema200 ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}"
          on:click={() => toggleIndicator('ema200')}
        >
          EMA 200
        </button>
        <button 
          class="px-3 py-1 text-sm rounded {indicators.rsi ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}"
          on:click={() => toggleIndicator('rsi')}
        >
          RSI
        </button>
        <button 
          class="px-3 py-1 text-sm rounded {indicators.vwap ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}"
          on:click={() => toggleIndicator('vwap')}
        >
          VWAP
        </button>
      </div>
    </div>
    
    <div bind:this={chartContainer} class="chart"></div>
  </div>
  
  <style>
    .chart-container {
      width: 100%;
      height: 100%;
    }
    
    .chart {
      width: 100%;
      height: 400px;
    }
  </style>