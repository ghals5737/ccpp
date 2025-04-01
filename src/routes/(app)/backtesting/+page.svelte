<script>
  import { onMount } from 'svelte';
  
  // State
  let startDate = '';
  let endDate = '';
  let initialCapital = 10000;
  let isLoading = false;
  let isBacktestComplete = false;
  
  // Backtest results
  let metrics = {
    total_trades: 0,
    winning_trades: 0,
    total_profit: 0,
    max_drawdown: 0
  };
  
  let trades = [];
  
  // Calculate win rate
  $: winRate = metrics.total_trades > 0 
    ? (metrics.winning_trades / metrics.total_trades * 100).toFixed(2) 
    : 0;
  
  // Run backtest
  async function runBacktest() {
    if (!startDate || !endDate) {
      alert('Please select start and end dates');
      return;
    }
    
    isLoading = true;
    isBacktestComplete = false;
    
    try {
      const response = await fetch('/backtest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          start_date: startDate,
          end_date: endDate,
          initial_capital: initialCapital
        })
      });
      
      const data = await response.json();
      
      metrics = data.metrics;
      trades = data.trades;
      isBacktestComplete = true;
      
    } catch (error) {
      console.error('Error running backtest:', error);
    } finally {
      isLoading = false;
    }
  }
  
  // Download backtest results as CSV
  function downloadResults() {
    if (!trades.length) return;
    
    // Create CSV content
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Date,Symbol,Direction,Entry Price,Exit Price,Size,P/L,P/L %\n';
    
    trades.forEach(trade => {
      csvContent += `${new Date(trade.timestamp).toISOString()},`;
      csvContent += `${trade.symbol},`;
      csvContent += `${trade.direction},`;
      csvContent += `${trade.entry_price},`;
      csvContent += `${trade.exit_price},`;
      csvContent += `${trade.size},`;
      csvContent += `${trade.pnl},`;
      csvContent += `${trade.pnl_percent}\n`;
    });
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `backtest-results-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  // Format currency
  function formatCurrency(value) {
    return `$${parseFloat(value).toFixed(2)}`;
  }
  
  // Format percentage
  function formatPercentage(value) {
    return `${value >= 0 ? '+' : ''}${parseFloat(value).toFixed(2)}%`;
  }
  
  onMount(() => {
    // Set default date range (last 30 days)
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    
    endDate = end.toISOString().split('T')[0];
    startDate = start.toISOString().split('T')[0];
  });
</script>

  <h1 class="text-2xl font-bold mb-6">Backtesting</h1>
  
  <div class="grid grid-cols-1 gap-6">
    <!-- Backtest Settings -->
    <div class="bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 class="text-lg font-semibold mb-4">Backtest Settings</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label class="block text-sm font-medium mb-1" for="start-date">Start Date</label>
          <input 
            type="date" 
            id="start-date"
            bind:value={startDate}
            class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-1" for="end-date">End Date</label>
          <input 
            type="date" 
            id="end-date"
            bind:value={endDate}
            class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-1" for="initial-capital">Initial Capital (USDT)</label>
          <input 
            type="number" 
            id="initial-capital"
            bind:value={initialCapital}
            min="100"
            step="100"
            class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div class="flex justify-end">
        <button 
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          on:click={runBacktest}
          disabled={isLoading}
        >
          {#if isLoading}
            <span class="flex items-center">
              <span class="mr-2">Running...</span>
              <span class="loader"></span>
            </span>
          {:else}
            Run Backtest
          {/if}
        </button>
      </div>
    </div>
    
    {#if isBacktestComplete}
      <!-- Performance Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-gray-800 rounded-lg shadow-lg p-4">
          <h3 class="text-sm text-gray-400 mb-1">Total Trades</h3>
          <p class="text-2xl font-bold">{metrics.total_trades}</p>
          <p class="text-sm text-gray-400">
            {metrics.winning_trades} winning, {metrics.total_trades - metrics.winning_trades} losing
          </p>
        </div>
        
        <div class="bg-gray-800 rounded-lg shadow-lg p-4">
          <h3 class="text-sm text-gray-400 mb-1">Win Rate</h3>
          <p class="text-2xl font-bold">{winRate}%</p>
          <p class="text-sm text-gray-400">
            {(metrics.winning_trades / metrics.total_trades * 100).toFixed(0)}% success rate
          </p>
        </div>
        
        <div class="bg-gray-800 rounded-lg shadow-lg p-4">
          <h3 class="text-sm text-gray-400 mb-1">Total Return</h3>
          <p class="text-2xl font-bold {metrics.total_profit >= 0 ? 'text-green-500' : 'text-red-500'}">
            {formatPercentage(metrics.total_profit)}
          </p>
          <p class="text-sm text-gray-400">
            {formatCurrency(initialCapital * metrics.total_profit / 100 + initialCapital)} final balance
          </p>
        </div>
        
        <div class="bg-gray-800 rounded-lg shadow-lg p-4">
          <h3 class="text-sm text-gray-400 mb-1">Max Drawdown</h3>
          <p class="text-2xl font-bold text-red-500">-{metrics.max_drawdown.toFixed(2)}%</p>
          <p class="text-sm text-gray-400">Largest drop from peak</p>
        </div>
      </div>
      
      <!-- Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div class="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
            <h2 class="text-lg font-semibold">Equity Curve</h2>
          </div>
          
          <div class="p-4">
            <!-- Equity curve chart placeholder -->
            <div class="chart-container bg-gray-900 rounded-md h-64 flex items-center justify-center">
              <p class="text-gray-400">Equity curve visualization</p>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div class="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
            <h2 class="text-lg font-semibold">Monthly Returns</h2>
          </div>
          
          <div class="p-4">
            <!-- Monthly returns chart placeholder -->
            <div class="chart-container bg-gray-900 rounded-md h-64 flex items-center justify-center">
              <p class="text-gray-400">Monthly returns visualization</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Trade History -->
      <div class="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div class="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
          <h2 class="text-lg font-semibold">Trade History</h2>
          <button 
            class="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md text-sm transition-colors flex items-center gap-2"
            on:click={downloadResults}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download CSV
          </button>
        </div>
        
        {#if trades.length === 0}
          <div class="p-6 text-center text-gray-400">
            No trades in backtest period
          </div>
        {:else}
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-gray-700/30">
                  <th class="py-2 px-4 text-left text-xs font-medium text-gray-400">Date</th>
                  <th class="py-2 px-4 text-left text-xs font-medium text-gray-400">Symbol</th>
                  <th class="py-2 px-4 text-left text-xs font-medium text-gray-400">Direction</th>
                  <th class="py-2 px-4 text-left text-xs font-medium text-gray-400">Entry</th>
                  <th class="py-2 px-4 text-left text-xs font-medium text-gray-400">Exit</th>
                  <th class="py-2 px-4 text-left text-xs font-medium text-gray-400">Size</th>
                  <th class="py-2 px-4 text-left text-xs font-medium text-gray-400">P/L</th>
                </tr>
              </thead>
              <tbody>
                {#each trades as trade (trade.id)}
                  <tr class="border-t border-gray-700 hover:bg-gray-700/30">
                    <td class="py-3 px-4 text-sm">{new Date(trade.timestamp).toLocaleString()}</td>
                    <td class="py-3 px-4">{trade.symbol}</td>
                    <td class="py-3 px-4">
                      <span class="px-2 py-1 rounded text-xs font-medium {trade.direction === 'long' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}">
                        {trade.direction.toUpperCase()}
                      </span>
                    </td>
                    <td class="py-3 px-4">{formatCurrency(trade.entry_price)}</td>
                    <td class="py-3 px-4">{formatCurrency(trade.exit_price)}</td>
                    <td class="py-3 px-4">{trade.size}</td>
                    <td class="py-3 px-4 {trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'} font-medium">
                      {formatPercentage(trade.pnl_percent)}
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {/if}
      </div>
    {/if}
  </div>

<style>
  .loader {
    display: inline-block;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    border-top: 2px solid #fff;
    width: 16px;
    height: 16px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>