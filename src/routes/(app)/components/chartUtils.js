// This is a simplified version - in a real app, you'd import a charting library like lightweight-charts
export function createLightweightChart(container) {
  // This is a mock implementation
  // In a real app, you'd use a library like lightweight-charts from TradingView

  const chart = {
    resize: (width, height) => {
      console.log('Resizing chart to', width, height);
    },
    addLineSeries: (options) => {
      console.log('Adding line series with options', options);
      return {
        setData: (data) => {
          console.log('Setting data for line series', data.length, 'points');
        },
        update: (point) => {
          console.log('Updating line series with point', point);
        }
      };
    },
    addHorizontalLine: (options) => {
      console.log('Adding horizontal line with options', options);
    },
    remove: () => {
      console.log('Removing chart');
    }
  };

  const candlestickSeries = {
    setData: (data) => {
      console.log('Setting data for candlestick series', data.length, 'candles');
    },
    update: (candle) => {
      console.log('Updating candlestick with candle', candle);
    },
    setMarker: (marker) => {
      console.log('Updating candlestick with candle', candle);
    },
    setMarker: (marker) => {
      console.log('Setting marker on candlestick series', marker);
    }
  };

  const volumeSeries = {
    setData: (data) => {
      console.log('Setting data for volume series', data.length, 'points');
    },
    update: (point) => {
      console.log('Updating volume series with point', point);
    }
  };

  return { chart, candlestickSeries, volumeSeries };
}