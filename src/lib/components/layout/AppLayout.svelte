<script>
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  
  // Navigation items
  const navItems = [
    { name: 'Dashboard', path: '/', icon: 'grid' },
    { name: 'Backtesting', path: '/backtest', icon: 'bar-chart-2' },
    { name: 'Settings', path: '/settings', icon: 'settings' }
  ];
  
  // Bot status
  let botStatus = 'stopped'; // 'running' or 'stopped'
  let connectionStatus = 'connected'; // 'connected', 'connecting', 'disconnected'
  let errorMessage = '';
  let showError = false;
  let dailyPnl = 0;
  let currentTime = new Date();
  let timeInterval;
  let websocket;
  
  // Mobile menu state
  let isMobileMenuOpen = false;
  
  // Update current time
  function updateTime() {
    currentTime = new Date();
  }
  
  // Toggle bot status
  async function toggleBotStatus() {
    try {
      const endpoint = botStatus === 'running' ? '/stop' : '/start';
      const response = await fetch(endpoint, { method: 'POST' });
      
      if (response.ok) {
        botStatus = botStatus === 'running' ? 'stopped' : 'running';
      } else {
        showErrorNotification('Failed to toggle bot status');
      }
    } catch (error) {
      console.error('Error toggling bot status:', error);
      showErrorNotification('Network error when toggling bot status');
    }
  }
  
  // Connect to WebSocket for real-time status updates
  function connectWebSocket() {
    connectionStatus = 'connecting';
    
    websocket = new WebSocket('wss://your-api-endpoint/ws');
    
    websocket.onopen = () => {
      connectionStatus = 'connected';
      console.log('WebSocket connected');
    };
    
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'status_update') {
        botStatus = data.status;
        dailyPnl = data.daily_pnl;
      } else if (data.type === 'error') {
        showErrorNotification(data.message);
      }
    };
    
    websocket.onerror = (error) => {
      connectionStatus = 'disconnected';
      console.error('WebSocket error:', error);
      showErrorNotification('WebSocket connection error');
    };
    
    websocket.onclose = () => {
      connectionStatus = 'disconnected';
      console.log('WebSocket disconnected');
      // Attempt to reconnect after 5 seconds
      setTimeout(connectWebSocket, 5000);
    };
  }
  
  // Show error notification
  function showErrorNotification(message) {
    errorMessage = message;
    showError = true;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      showError = false;
    }, 5000);
  }
  
  // Fetch initial bot status
  async function fetchInitialStatus() {
    try {
      const response = await fetch('/status');
      const data = await response.json();
      
      botStatus = data.status;
      dailyPnl = data.daily_pnl;
    } catch (error) {
      console.error('Error fetching bot status:', error);
      showErrorNotification('Failed to fetch bot status');
    }
  }
  
  // Setup on component mount
  onMount(() => {
    fetchInitialStatus();
    connectWebSocket();
    
    // Update time every second
    timeInterval = setInterval(updateTime, 1000);
  });
  
  // Cleanup on component destroy
  onDestroy(() => {
    if (timeInterval) clearInterval(timeInterval);
    if (websocket) websocket.close();
  });
  
  // Format time
  function formatTime(date) {
    return date.toLocaleTimeString();
  }
  
  // Format date
  function formatDate(date) {
    return date.toLocaleDateString();
  }
</script>

<div class="app-container bg-gray-900 text-gray-100 min-h-screen flex flex-col">
  <!-- Mobile navigation header -->
  <header class="md:hidden bg-gray-800 px-4 py-3 border-b border-gray-700 flex justify-between items-center">
    <div class="flex items-center">
      <button 
        class="mr-3"
        on:click={() => isMobileMenuOpen = !isMobileMenuOpen}
        aria-label="Toggle menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <h1 class="text-xl font-bold text-blue-400">Trading Bot</h1>
    </div>
    
    <div class="flex items-center">
      <div class="flex items-center mr-3">
        <div class={`w-2 h-2 rounded-full mr-2 ${connectionStatus === 'connected' ? 'bg-green-500' : connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
        <span class="text-sm">{connectionStatus}</span>
      </div>
      
      <button 
        class={`px-3 py-1 rounded-md text-sm ${botStatus === 'running' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} transition-colors`}
        on:click={toggleBotStatus}
      >
        {botStatus === 'running' ? 'Stop' : 'Start'}
      </button>
    </div>
  </header>
  
  <!-- Mobile navigation menu (slide-in) -->
  {#if isMobileMenuOpen}
    <div 
      class="fixed inset-0 bg-gray-900/80 z-40"
      on:click={() => isMobileMenuOpen = false}
      transition:fade={{ duration: 150 }}
    ></div>
    
    <div 
      class="fixed inset-y-0 left-0 w-64 bg-gray-800 z-50 transform transition-transform duration-200 ease-in-out"
      class:translate-x-0={isMobileMenuOpen}
      class:-translate-x-full={!isMobileMenuOpen}
    >
      <div class="p-4 border-b border-gray-700">
        <h2 class="text-xl font-bold text-blue-400">Trading Bot</h2>
      </div>
      
      <nav class="py-4">
        {#each navItems as item}
          <a 
            href={item.path} 
            class="block px-4 py-3 hover:bg-gray-700 transition-colors flex items-center {$page.url.pathname === item.path ? 'bg-gray-700 text-blue-400' : 'text-gray-300'}"
            on:click={() => isMobileMenuOpen = false}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getIconPath(item.icon)} />
            </svg>
            {item.name}
          </a>
        {/each}
      </nav>
      
      <div class="absolute bottom-0 left-0 right-0 p-4 bg-gray-800 border-t border-gray-700">
        <div class="text-sm text-gray-400 mb-2">
          <div class="flex justify-between mb-1">
            <span>Status:</span>
            <span class={botStatus === 'running' ? 'text-green-500' : 'text-red-500'}>
              {botStatus === 'running' ? 'Running' : 'Stopped'}
            </span>
          </div>
          <div class="flex justify-between">
            <span>Daily P/L:</span>
            <span class={dailyPnl >= 0 ? 'text-green-500' : 'text-red-500'}>
              {dailyPnl >= 0 ? '+' : ''}{dailyPnl.toFixed(2)}%
            </span>
          </div>
        </div>
        <div class="text-xs text-gray-500">{formatDate(currentTime)} {formatTime(currentTime)}</div>
      </div>
    </div>
  {/if}
  
  <!-- Desktop layout -->
  <div class="flex-1 flex md:flex-row flex-col">
    <!-- Sidebar navigation (desktop) -->
    <aside class="hidden md:flex md:flex-col w-64 bg-gray-800 border-r border-gray-700">
      <div class="p-4 border-b border-gray-700">
        <h2 class="text-xl font-bold text-blue-400">Trading Bot</h2>
      </div>
      
      <nav class="flex-1 py-4">
        {#each navItems as item}
          <a 
            href={item.path} 
            class="block px-4 py-3 hover:bg-gray-700 transition-colors flex items-center {$page.url.pathname === item.path ? 'bg-gray-700 text-blue-400' : 'text-gray-300'}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getIconPath(item.icon)} />
            </svg>
            {item.name}
          </a>
        {/each}
      </nav>
      
      <div class="p-4 border-t border-gray-700 bg-gray-800">
        <div class="flex items-center mb-2">
          <div class={`w-2 h-2 rounded-full mr-2 ${connectionStatus === 'connected' ? 'bg-green-500' : connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
          <span class="text-sm">{connectionStatus}</span>
        </div>
        
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm">Bot Status:</span>
          <div class="flex items-center">
            <div class={`w-2 h-2 rounded-full mr-2 ${botStatus === 'running' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span class="text-sm">{botStatus === 'running' ? 'Running' : 'Stopped'}</span>
          </div>
        </div>
        
        <div class="flex justify-between items-center mb-3">
          <span class="text-sm">Daily P/L:</span>
          <span class={`text-sm ${dailyPnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {dailyPnl >= 0 ? '+' : ''}{dailyPnl.toFixed(2)}%
          </span>
        </div>
        
        <button 
          class={`w-full px-3 py-2 rounded-md ${botStatus === 'running' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} transition-colors`}
          on:click={toggleBotStatus}
        >
          {botStatus === 'running' ? 'Stop Bot' : 'Start Bot'}
        </button>
        
        <div class="mt-3 text-center text-xs text-gray-500">{formatDate(currentTime)} {formatTime(currentTime)}</div>
      </div>
    </aside>
    
    <!-- Main content area -->
    <main class="flex-1 overflow-auto">
      <!-- Status bar (desktop) -->
      <div class="hidden md:flex items-center justify-between bg-gray-800/60 px-6 py-2 border-b border-gray-700">
        <div class="text-sm text-gray-300">{formatDate(currentTime)} {formatTime(currentTime)}</div>
        
        <div class="flex items-center">
          <div class="mr-4 flex items-center">
            <div class={`w-2 h-2 rounded-full mr-2 ${connectionStatus === 'connected' ? 'bg-green-500' : connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
            <span class="text-sm">{connectionStatus}</span>
          </div>
          
          <div class="flex items-center">
            <span class="text-sm mr-2">Daily P/L:</span>
            <span class={`text-sm font-medium ${dailyPnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {dailyPnl >= 0 ? '+' : ''}{dailyPnl.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
      
      <!-- Error notification -->
      {#if showError}
        <div 
          class="fixed top-4 right-4 left-4 md:left-auto md:w-96 bg-red-900/90 border border-red-700 rounded-md px-4 py-3 shadow-lg z-50 flex items-start"
          transition:fade={{ duration: 150 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div class="flex-1">
            <div class="flex justify-between items-start">
              <h3 class="text-sm font-medium text-red-300">Error</h3>
              <button 
                class="text-red-300 hover:text-red-100 ml-4"
                on:click={() => showError = false}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p class="text-sm text-red-200 mt-1">{errorMessage}</p>
          </div>
        </div>
      {/if}
      
      <!-- Page content -->
      <div class="p-4 md:p-6">
        <slot />
      </div>
    </main>
  </div>
</div>

<script context="module">
  // Helper function to get icon paths
  function getIconPath(icon) {
    switch (icon) {
      case 'grid':
        return 'M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zm-10 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z';
      case 'bar-chart-2':
        return 'M18 20V10M12 20V4M6 20v-6';
      case 'settings':
        return 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z';
      default:
        return '';
    }
  }
</script>

<style>
  .app-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }
  
  main {
    height: 100%;
    overflow-y: auto;
  }
</style>