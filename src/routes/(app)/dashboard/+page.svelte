<script>
  import { onMount, onDestroy } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  
  // State
  let positions = [];
  let logs = [];
  let isLoadingPositions = true;
  let isLoadingLogs = true;
  let websocket;
  
  // Chart state
  let selectedTimeframe = '15m';
  let selectedIndicators = {
    ema50: true,
    ema200: true,
    rsi: true,
    vwap: false
  };
  
  // Refresh functions
  async function refreshPositions() {
    isLoadingPositions = true;
    
    try {
      const response = await fetch('/positions');
      const data = await response.json();
      positions = data.positions;
    } catch (error) {
      console.error('Error fetching positions:', error);
    } finally {
      isLoadingPositions = false;
    }
  }
  
  async function refreshLogs() {
    isLoadingLogs = true;
    
    try {
      const response = await fetch('/log');
      const data = await response.json();
      logs = data.logs;
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      isLoadingLogs = false;
    }
  }
  
  // Close a position
  async function closePosition(symbol) {
    try {
      await fetch(`/positions/${symbol}/close`, {
        method: 'POST'
      });
      
      // Remove from the local list
      positions = positions.filter(p => p.symbol !== symbol);
    } catch (error) {
      console.error('Error closing position:', error);
    }
  }
  
  // Connect to WebSocket for real-time updates
  function connectWebSocket() {
    websocket = new WebSocket('wss://your-api-endpoint/ws');
    
    websocket.onopen = () => {
      console.log('Dashboard WebSocket connected');
    };
    
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'position_update') {
        // Update positions
        const existingIndex = positions.findIndex(p => p.symbol === data.position.symbol);
        
        if (existingIndex >= 0) {
          positions[existingIndex] = data.position;
          positions = [...positions];
        } else {
          positions = [...positions, data.position];
        }
      } else if (data.type === 'position_close') {
        // Remove closed position
        positions = positions.filter(p => p.symbol !== data.symbol);
      } else if (data.type === 'log') {
        // Add new log entry
        logs = [data.log, ...logs].slice(0, 100); // Keep last 100 logs
      }
    };
    
    websocket.onerror = (error) => {
      console.error('Dashboard WebSocket error:', error);
    };
    
    websocket.onclose = () => {
      console.log('Dashboard WebSocket disconnected');
      // Attempt to reconnect after 5 seconds
      setTimeout(connectWebSocket, 5000);
    };
  }
  
  // Format timestamp
  function formatTime(timestamp) {
    return new Date(timestamp).toLocaleTimeString();
  }
  
  // Format percentage
  function formatPercentage(value) {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  }
  
  // Format currency
  function formatCurrency(value) {
    return `$${value.toFixed(2)}`;
  }
  
  onMount(() => {
    refreshPositions();
    refreshLogs();
    connectWebSocket();
  });
  
  onDestroy(() => {
    if (websocket) {
      websocket.close();
    }
  });
</script>

  <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
  
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Active Positions -->
    <div class="lg:col-span-1">
      <div class="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div class="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
          <h2 class="text-lg font-semibold">Active Positions</h2>
          <button 
            class="p-1 rounded-md hover:bg-gray-700 transition-colors"
            on:click={refreshPositions}
            title="Refresh"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        
        {#if isLoadingPositions}
          <div class="p-6 flex justify-center">
            <div class="loader"></div>
          </div>
        {:else if positions.length === 0}
          <div class="p-6 text-center text-gray-400">
            No active positions
          </div>
        {:else}
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-gray-700/30">
                  <th class="py-2 px-4 text-left text-xs font-medium text-gray-400">Symbol</th>
                  <th class="py-2 px-4 text-left text-xs font-medium text-gray-400">Type</th>
                  <th class="py-2 px-4 text-left text-xs font-medium text-gray-400">Entry</th>
                  <th class="py-2 px-4 text-left text-xs font-medium text-gray-400">Current</th>
                  <th class="py-2 px-4 text-left text-xs font-medium text-gray-400">P/L</th>
                  <th class="py-2 px-4 text-left text-xs font-medium text-gray-400">Size</th>
                  <th class="py-2 px-4 text-right text-xs font-medium text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {#each positions as position (position.symbol)}
                  <tr class="border-t border-gray-700 hover:bg-gray-700/30">
                    <td class="py-3 px-4">{position.symbol}</td>
                    <td class="py-3 px-4">
                      <span class="px-2 py-1 rounded text-xs font-medium {position.direction === 'long' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}">
                        {position.direction.toUpperCase()}
                      </span>
                    </td>
                    <td class="py-3 px-4">{formatCurrency(position.entry_price)}</td>
                    <td class="py-3 px-4">{formatCurrency(position.current_price)}</td>
                    <td class="py-3 px-4 {position.pnl_percent >= 0 ? 'text-green-500' : 'text-red-500'}">
                      {formatPercentage(position.pnl_percent)}
                    </td>
                    <td class="py-3 px-4">{position.size}</td>
                    <td class="py-3 px-4 text-right">
                      <button 
                        class="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md text-xs font-medium transition-colors"
                        on:click={() => closePosition(position.symbol)}
                      >
                        Close
                      </button>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {/if}
      </div>
      
      <!-- Trade Logs -->
      <div class="bg-gray-800 rounded-lg shadow-lg overflow-hidden mt-6">
        <div class="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
          <h2 class="text-lg font-semibold">Recent Trade Logs</h2>
          <button 
            class="p-1 rounded-md hover:bg-gray-700 transition-colors"
            on:click={refreshLogs}
            title="Refresh"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        
        {#if isLoadingLogs}
          <div class="p-6 flex justify-center">
            <div class="loader"></div>
          </div>
        {:else if logs.length === 0}
          <div class="p-6 text-center text-gray-400">
            No trade logs
          </div>
        {:else}
          <div class="overflow-y-auto max-h-80">
            <table class="w-full">
              <thead>
                <tr class="bg-gray-700/30">
                  <th class="py-2 px-4 text-left text-xs font-medium text-gray-400">Time</th>
                  <th class="py-2 px-4 text-left text-xs font-medium text-gray-400">Type</th>
                  <th class="py-2 px-4 text-left text-xs font-medium text-gray-400">Symbol</th>
                  <th class="py-2 px-4 text-left text-xs font-medium text-gray-400">Price</th>
                  <th class="py-2 px-4 text-left text-xs font-medium text-gray-400">Quantity</th>
                  <th class="py-2 px-4 text-left text-xs font-medium text-gray-400">P/L</th>
                </tr>
              </thead>
              <tbody>
                {#each logs as log (log.id)}
                  <tr class="border-t border-gray-700 hover:bg-gray-700/30">
                    <td class="py-3 px-4 text-xs">{formatTime(log.timestamp)}</td>
                    <td class="py-3 px-4">
                      <span class="px-2 py-1 rounded text-xs font-medium {log.type === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}">
                        {log.type.toUpperCase()}
                      </span>
                    </td>
                    <td class="py-3 px-4 text-xs">{log.symbol}</td>
                    <td class="py-3 px-4 text-xs">{formatCurrency(log.price)}</td>
                    <td class="py-3 px-4 text-xs">{log.quantity}</td>
                    <td class="py-3 px-4 text-xs {log.pnl >= 0 ? 'text-green-500' : 'text-red-500'}">
                      {log.pnl ? formatPercentage(log.pnl) : '-'}
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {/if}
      </div>
    </div>
    
    <!-- Chart Section -->
    <div class="lg:col-span-2">
      <div class="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div class="p-4 bg-gray-800 border-b border-gray-700">
          <div class="flex flex-wrap justify-between items-center">
            <h2 class="text-lg font-semibold">BTC/USDT Chart</h2>
            
            <div class="flex mt-2 sm:mt-0">
              <!-- Timeframe selector -->
              <div class="flex rounded-md overflow-hidden mr-2">
                <button 
                  class="px-3 py-1 text-xs {selectedTimeframe === '5m' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}"
                  on:click={() => selectedTimeframe = '5m'}
                >
                  5m
                </button>
                <button 
                  class="px-3 py-1 text-xs {selectedTimeframe === '15m' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}"
                  on:click={() => selectedTimeframe = '15m'}
                >
                  15m
                </button>
                <button 
                  class="px-3 py-1 text-xs {selectedTimeframe === '1h' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}"
                  on:click={() => selectedTimeframe = '1h'}
                >
                  1h
                </button>
                <button 
                  class="px-3 py-1 text-xs {selectedTimeframe === '4h' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}"
                  on:click={() => selectedTimeframe = '4h'}
                >
                  4h
                </button>
                <button 
                  class="px-3 py-1 text-xs {selectedTimeframe === '1d' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}"
                  on:click={() => selectedTimeframe = '1d'}
                >
                  1d
                </button>
              </div>
              
              <!-- Indicators toggle -->
              <div class="flex">
                <button 
                  class="px-2 py-1 text-xs rounded-md {selectedIndicators.ema50 ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'} ml-1"
                  on:click={() => selectedIndicators.ema50 = !selectedIndicators.ema50}
                >
                  EMA50
                </button>
                <button 
                  class="px-2 py-1 text-xs rounded-md {selectedIndicators.ema200 ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'} ml-1"
                  on:click={() => selectedIndicators.ema200 = !selectedIndicators.ema200}
                >
                  EMA200
                </button>
                <button 
                  class="px-2 py-1 text-xs rounded-md {selectedIndicators.rsi ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'} ml-1"
                  on:click={() => selectedIndicators.rsi = !selectedIndicators.rsi}
                >
                  RSI
                </button>
                <button 
                  class="px-2 py-1 text-xs rounded-md {selectedIndicators.vwap ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'} ml-1"
                  on:click={() => selectedIndicators.vwap = !selectedIndicators.vwap}
                >
                  VWAP
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="p-4">
          <!-- Chart placeholder - in a real app, use a charting library -->
          <div class="chart-container bg-gray-900 rounded-md h-96 flex items-center justify-center">
            <div class="text-center">
              <p class="text-gray-400 mb-2">Interactive BTC/USDT Chart</p>
              <p class="text-xs text-gray-500">Timeframe: {selectedTimeframe}</p>
              <p class="text-xs text-gray-500 mt-1">
                Indicators: 
                {#if Object.values(selectedIndicators).some(v => v)}
                  {Object.entries(selectedIndicators)
                    .filter(([_, enabled]) => enabled)
                    .map(([indicator]) => indicator.toUpperCase())
                    .join(', ')}
                {:else}
                  None
                {/if}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

<style>
  .loader {
    border: 3px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    border-top: 3px solid #2196F3;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .chart-container {
    width: 100%;
    height: 400px;
  }
</style>