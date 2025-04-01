<script>
  import { onMount } from 'svelte';
  // Trading settings
  let riskPerTrade = 1; // percentage
  let maxPositions = 3;
  let dailyLossLimit = 5; // percentage
  let defaultPositionSize = 0.01; // BTC
  let maxPositionSize = 0.1; // BTC
  
  // Strategy settings
  let emaPeriodShort = 50;
  let emaPeriodLong = 200;
  let rsiPeriod = 14;
  let rsiOverbought = 70;
  let rsiOversold = 30;
  let vwapPeriod = "1d";
  
  // Entry conditions
  let entryConditions = {
    emasCrossover: true,
    rsiOversold: true,
    priceAboveVWAP: false
  };
  
  // Exit conditions
  let exitConditions = {
    emasCrossover: true,
    rsiOverbought: true,
    priceBelowVWAP: false,
    takeProfitPercent: 2,
    stopLossPercent: 1
  };
  
  // API settings
  let apiKey = '';
  let apiSecret = '';
  
  // Notification settings
  let notifications = {
    tradeEntry: true,
    tradeExit: true,
    lossLimitReached: true,
    systemErrors: true,
    botStatusChange: true
  };
  
  // System settings
  let logLevel = 'info';
  let dataRetentionDays = 30;
  let autoBackup = true;
  
  // UI state
  let isLoading = true;
  let isSaving = false;
  let showApiSecret = false;
  let saveSuccess = false;
  let activeTab = 'trading';
  
  // Tabs
  const tabs = [
    { id: 'trading', name: 'Trading' },
    { id: 'strategy', name: 'Strategy' },
    { id: 'api', name: 'API' },
    { id: 'notifications', name: 'Notifications' },
    { id: 'system', name: 'System' }
  ];
  
  // Fetch settings
  async function fetchSettings() {
    isLoading = true;
    
    try {
      const response = await fetch('/settings');
      const data = await response.json();
      
      // Trading settings
      riskPerTrade = data.risk_per_trade;
      maxPositions = data.max_positions;
      dailyLossLimit = data.daily_loss_limit;
      defaultPositionSize = data.default_position_size;
      maxPositionSize = data.max_position_size;
      
      // Strategy settings
      emaPeriodShort = data.ema_period_short;
      emaPeriodLong = data.ema_period_long;
      rsiPeriod = data.rsi_period;
      rsiOverbought = data.rsi_overbought;
      rsiOversold = data.rsi_oversold;
      vwapPeriod = data.vwap_period;
      
      // Entry/exit conditions
      entryConditions = data.entry_conditions;
      exitConditions = data.exit_conditions;
      
      // API settings
      apiKey = data.api_key;
      apiSecret = data.api_secret ? '••••••••••••••••' : '';
      
      // Notification settings
      notifications = data.notifications;
      
      // System settings
      logLevel = data.log_level;
      dataRetentionDays = data.data_retention_days;
      autoBackup = data.auto_backup;
      
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      isLoading = false;
    }
  }
  
  // Save settings
  async function saveSettings() {
    isSaving = true;
    saveSuccess = false;
    
    try {
      const response = await fetch('/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // Trading settings
          risk_per_trade: riskPerTrade,
          max_positions: maxPositions,
          daily_loss_limit: dailyLossLimit,
          default_position_size: defaultPositionSize,
          max_position_size: maxPositionSize,
          
          // Strategy settings
          ema_period_short: emaPeriodShort,
          ema_period_long: emaPeriodLong,
          rsi_period: rsiPeriod,
          rsi_overbought: rsiOverbought,
          rsi_oversold: rsiOversold,
          vwap_period: vwapPeriod,
          
          // Entry/exit conditions
          entry_conditions: entryConditions,
          exit_conditions: exitConditions,
          
          // API settings
          api_key: apiKey,
          api_secret: apiSecret === '••••••••••••••••' ? null : apiSecret,
          
          // Notification settings
          notifications: notifications,
          
          // System settings
          log_level: logLevel,
          data_retention_days: dataRetentionDays,
          auto_backup: autoBackup
        })
      });
      
      if (response.ok) {
        saveSuccess = true;
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          saveSuccess = false;
        }, 3000);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      isSaving = false;
    }
  }
  
  // Test API connection
  async function testApiConnection() {
    if (!apiKey || (!apiSecret || apiSecret === '••••••••••••••••')) {
      alert('Please enter API key and secret');
      return;
    }
    
    try {
      const response = await fetch('/test-api-connection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          api_key: apiKey,
          api_secret: apiSecret === '••••••••••••••••' ? null : apiSecret
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('API connection successful!');
      } else {
        alert(`API connection failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error testing API connection:', error);
      alert('Failed to test API connection. Please check your network connection.');
    }
  }
  
  onMount(fetchSettings);
</script>

  <h1 class="text-2xl font-bold mb-6">Settings</h1>
  
  {#if isLoading}
    <div class="flex justify-center items-center h-64">
      <div class="loader"></div>
    </div>
  {:else}
    <!-- Tabs -->
    <div class="flex border-b border-gray-700 mb-6 overflow-x-auto">
      {#each tabs as tab}
        <button 
          class="px-4 py-2 font-medium text-sm {activeTab === tab.id ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}"
          on:click={() => activeTab = tab.id}
        >
          {tab.name}
        </button>
      {/each}
    </div>
    
    <div class="space-y-6">
      <!-- Trading Settings -->
      {#if activeTab === 'trading'}
        <div class="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-lg font-semibold mb-4">Risk Management</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium mb-1" for="risk-per-trade">
                Risk Per Trade (% of account)
              </label>
              <input 
                type="number" 
                id="risk-per-trade"
                bind:value={riskPerTrade}
                min="0.1"
                max="10"
                step="0.1"
                class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p class="text-xs text-gray-400 mt-1">
                Percentage of your account balance to risk on each trade
              </p>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1" for="max-positions">
                Maximum Positions
              </label>
              <input 
                type="number" 
                id="max-positions"
                bind:value={maxPositions}
                min="1"
                max="10"
                step="1"
                class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p class="text-xs text-gray-400 mt-1">
                Maximum number of open positions at any time
              </p>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1" for="daily-loss-limit">
                Daily Loss Limit (%)
              </label>
              <input 
                type="number" 
                id="daily-loss-limit"
                bind:value={dailyLossLimit}
                min="1"
                max="20"
                step="1"
                class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p class="text-xs text-gray-400 mt-1">
                Bot will stop trading if daily loss exceeds this percentage
              </p>
            </div>
          </div>
          
          <h2 class="text-lg font-semibold mt-6 mb-4">Position Sizing</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium mb-1" for="default-position-size">
                Default Position Size
              </label>
              <input 
                type="number" 
                id="default-position-size"
                bind:value={defaultPositionSize}
                min="0.001"
                max="1"
                step="0.001"
                class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p class="text-xs text-gray-400 mt-1">
                Default size for new positions (in BTC)
              </p>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1" for="max-position-size">
                Maximum Position Size
              </label>
              <input 
                type="number" 
                id="max-position-size"
                bind:value={maxPositionSize}
                min="0.01"
                max="10"
                step="0.01"
                class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p class="text-xs text-gray-400 mt-1">
                Maximum allowed position size (in BTC)
              </p>
            </div>
          </div>
        </div>
      {/if}
      
      <!-- Strategy Settings -->
      {#if activeTab === 'strategy'}
        <div class="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-lg font-semibold mb-4">Technical Indicators</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-medium mb-1" for="ema-short">
                EMA Short Period
              </label>
              <input 
                type="number" 
                id="ema-short"
                bind:value={emaPeriodShort}
                min="5"
                max="100"
                step="1"
                class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1" for="ema-long">
                EMA Long Period
              </label>
              <input 
                type="number" 
                id="ema-long"
                bind:value={emaPeriodLong}
                min="50"
                max="300"
                step="1"
                class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1" for="rsi-period">
                RSI Period
              </label>
              <input 
                type="number" 
                id="rsi-period"
                bind:value={rsiPeriod}
                min="2"
                max="30"
                step="1"
                class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1" for="rsi-overbought">
                RSI Overbought Level
              </label>
              <input 
                type="number" 
                id="rsi-overbought"
                bind:value={rsiOverbought}
                min="50"
                max="90"
                step="1"
                class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1" for="rsi-oversold">
                RSI Oversold Level
              </label>
              <input 
                type="number" 
                id="rsi-oversold"
                bind:value={rsiOversold}
                min="10"
                max="50"
                step="1"
                class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1" for="vwap-period">
                VWAP Period
              </label>
              <select 
                id="vwap-period"
                bind:value={vwapPeriod}
                class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1h">1 Hour</option>
                <option value="4h">4 Hours</option>
                <option value="1d">1 Day</option>
              </select>
            </div>
          </div>
          
          <h2 class="text-lg font-semibold mt-6 mb-4">Entry Conditions</h2>
          
          <div class="space-y-3">
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="entry-ema-crossover"
                bind:checked={entryConditions.emasCrossover}
                class="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <label class="ml-2 text-sm" for="entry-ema-crossover">
                EMA Crossover (Short crosses above Long)
              </label>
            </div>
            
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="entry-rsi-oversold"
                bind:checked={entryConditions.rsiOversold}
                class="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <label class="ml-2 text-sm" for="entry-rsi-oversold">
                RSI below Oversold level
              </label>
            </div>
            
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="entry-price-vwap"
                bind:checked={entryConditions.priceAboveVWAP}
                class="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <label class="ml-2 text-sm" for="entry-price-vwap">
                Price above VWAP
              </label>
            </div>
          </div>
          
          <h2 class="text-lg font-semibold mt-6 mb-4">Exit Conditions</h2>
          
          <div class="space-y-3">
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="exit-ema-crossover"
                bind:checked={exitConditions.emasCrossover}
                class="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <label class="ml-2 text-sm" for="exit-ema-crossover">
                EMA Crossover (Short crosses below Long)
              </label>
            </div>
            
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="exit-rsi-overbought"
                bind:checked={exitConditions.rsiOverbought}
                class="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <label class="ml-2 text-sm" for="exit-rsi-overbought">
                RSI above Overbought level
              </label>
            </div>
            
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="exit-price-vwap"
                bind:checked={exitConditions.priceBelowVWAP}
                class="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <label class="ml-2 text-sm" for="exit-price-vwap">
                Price below VWAP
              </label>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label class="block text-sm font-medium mb-1" for="take-profit">
                  Take Profit (%)
                </label>
                <input 
                  type="number" 
                  id="take-profit"
                  bind:value={exitConditions.takeProfitPercent}
                  min="0.5"
                  max="20"
                  step="0.5"
                  class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-1" for="stop-loss">
                  Stop Loss (%)
                </label>
                <input 
                  type="number" 
                  id="stop-loss"
                  bind:value={exitConditions.stopLossPercent}
                  min="0.5"
                  max="10"
                  step="0.5"
                  class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      {/if}
      
      <!-- API Settings -->
      {#if activeTab === 'api'}
        <div class="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-lg font-semibold mb-4">Binance API Settings</h2>
          
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1" for="api-key">
              API Key
            </label>
            <input 
              type="text" 
              id="api-key"
              bind:value={apiKey}
              class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Binance API key"
            />
          </div>
          
          <div class="mb-6">
            <label class="block text-sm font-medium mb-1" for="api-secret">
              API Secret
            </label>
            <div class="relative">
              <input 
                type={showApiSecret ? 'text' : 'password'}
                id="api-secret"
                bind:value={apiSecret}
                class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your Binance API secret"
              />
              <button 
                type="button"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                on:click={() => showApiSecret = !showApiSecret}
              >
                {#if showApiSecret}
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                {:else}
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                {/if}
              </button>
            </div>
            <p class="text-xs text-gray-400 mt-1">
              Your API secret is encrypted before being stored
            </p>
          </div>
          
          <div class="flex justify-between items-center">
            <div class="bg-yellow-900/30 border border-yellow-700/50 rounded-md p-3 max-w-lg">
              <div class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p class="text-sm text-yellow-500 font-medium">Important Security Notice</p>
                  <p class="text-xs text-yellow-500/80 mt-1">
                    Ensure your Binance API key has only trading permissions, not withdrawal access. 
                    Never share your API credentials with anyone.
                  </p>
                </div>
              </div>
            </div>
            
            <button 
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              on:click={testApiConnection}
            >
              Test Connection
            </button>
          </div>
        </div>
      {/if}
      
      <!-- Notification Settings -->
      {#if activeTab === 'notifications'}
        <div class="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-lg font-semibold mb-4">Trade Notifications</h2>
          
          <div class="space-y-3">
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="notify-trade-entry"
                bind:checked={notifications.tradeEntry}
                class="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <label class="ml-2 text-sm" for="notify-trade-entry">
                Position Entry
              </label>
            </div>
            
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="notify-trade-exit"
                bind:checked={notifications.tradeExit}
                class="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <label class="ml-2 text-sm" for="notify-trade-exit">
                Position Exit
              </label>
            </div>
            
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="notify-loss-limit"
                bind:checked={notifications.lossLimitReached}
                class="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <label class="ml-2 text-sm" for="notify-loss-limit">
                Loss Limit Reached
              </label>
            </div>
          </div>
          
          <h2 class="text-lg font-semibold mt-6 mb-4">System Notifications</h2>
          
          <div class="space-y-3">
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="notify-errors"
                bind:checked={notifications.systemErrors}
                class="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <label class="ml-2 text-sm" for="notify-errors">
                System Errors
              </label>
            </div>
            
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="notify-bot-status"
                bind:checked={notifications.botStatusChange}
                class="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <label class="ml-2 text-sm" for="notify-bot-status">
                Bot Status Changes
              </label>
            </div>
          </div>
        </div>
      {/if}
      
      <!-- System Settings -->
      {#if activeTab === 'system'}
        <div class="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-lg font-semibold mb-4">System Settings</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium mb-1" for="log-level">
                Log Level
              </label>
              <select 
                id="log-level"
                bind:value={logLevel}
                class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="debug">Debug</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
              <p class="text-xs text-gray-400 mt-1">
                Controls the verbosity of log messages
              </p>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1" for="data-retention">
                Data Retention (days)
              </label>
              <input 
                type="number" 
                id="data-retention"
                bind:value={dataRetentionDays}
                min="7"
                max="365"
                step="1"
                class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p class="text-xs text-gray-400 mt-1">
                How long to keep trade and log data
              </p>
            </div>
          </div>
          
          <div class="mt-4">
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="auto-backup"
                bind:checked={autoBackup}
                class="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <label class="ml-2 text-sm" for="auto-backup">
                Enable automatic daily backups
              </label>
            </div>
          </div>
        </div>
      {/if}
      
      <!-- Save Button -->
      <div class="flex justify-end">
        {#if saveSuccess}
          <div class="mr-4 px-4 py-2 bg-green-600 rounded-md flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Settings saved successfully
          </div>
        {/if}
        
        <button 
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          on:click={saveSettings}
          disabled={isSaving}
        >
          {#if isSaving}
            <span class="flex items-center">
              <span class="mr-2">Saving...</span>
              <span class="loader"></span>
            </span>
          {:else}
            Save Settings
          {/if}
        </button>
      </div>
    </div>
  {/if}

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