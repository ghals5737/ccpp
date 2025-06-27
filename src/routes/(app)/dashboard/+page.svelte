<script lang="ts">
    import { page } from "$app/stores";
    import { RefreshCw, ArrowUp, ArrowDown, AlertCircle, FileText, TrendingUp, Activity } from "lucide-svelte" 
	  import MainLayout from "../MainLayout.svelte";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Alert from "$lib/components/ui/alert/index.js";
    import PositionsTable from "$lib/components/dashboard/PositionsTable.svelte"
    import { onMount } from "svelte";
	  import BacktestPreview from "$lib/components/dashboard/BacktestPreview.svelte";
	  import DashboardLogs from "$lib/components/dashboard/DashboardLogs.svelte";
	  import TradingChart from "$lib/components/dashboard/TradingChart.svelte";

    let strategyRunning = true
    let showAlert = true
    let isRefreshing = false
    let lastUpdated = new Date()

    const toggleStrategy = () => {
        strategyRunning = !strategyRunning
    }

    const refreshData = () => {
        isRefreshing = true
        // 데이터 새로고침 시뮬레이션
        setTimeout(() => {
        isRefreshing = false
        lastUpdated = new Date()
        }, 800)
    }

    const loadSignals= async () => {
        const response = await fetch("/api/logs/signals")
        const data = await response.json()
        console.log("data",data)
    }

    const loadPositions= async () => {
        const response = await fetch("/api/positions")
        const data = await response.json()
        console.log("data",data)
    }

    const loadDailyPnl = async () => {
        const response = await fetch("/api/pnl/daily")
        const data = await response.json()
        console.log("data",data)
    }

    
        

    onMount(() => {
        // 컴포넌트 마운트 시 현재 시간으로 마지막 업데이트 시간 설정
        lastUpdated = new Date()
    })

</script>

<MainLayout>        
  <div class="p-3 md:p-6 space-y-4 md:space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <div class="flex items-center">
          <div class="h-3 w-3 rounded-full bg-[#02c076] mr-2"></div>
          <span class="text-sm md:text-base font-bold text-[#f0f0f0]">TRADING DASHBOARD</span>
        </div>

        {#if showAlert}
          <Alert.Root class="bg-[#2d1b1e] border-[#f6465d] text-[#f6465d] rounded-md flex-1 sm:flex-none sm:max-w-md">
            <AlertCircle class="h-4 w-4" />
            <Alert.Description class="text-xs flex items-center justify-between">
              <span>Daily loss limit reached (-5.2%)</span>
              <Button variant="ghost" size="sm" onclick={() => showAlert = false} class="h-5 p-0 ml-2">
                <span class="text-xs">×</span>
              </Button>
            </Alert.Description>
          </Alert.Root>
        {/if}
      </div>

      <div class="flex items-center space-x-2">
        <span class="text-xs text-[#848e9c]">Last updated: {lastUpdated.toLocaleTimeString()}</span>
        <Button
          variant="outline"
          size="sm"
          onclick={refreshData}
          disabled={isRefreshing}
          class="h-7 w-7 p-0 bg-[#2b3139] border-[#3c4043] hover:bg-[#3c4043] text-[#f0f0f0]"
        >
          <RefreshCw class={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
        </Button>
      </div>
    </div>
    <div class="bg-[#2b3139] rounded-lg p-4 md:p-6">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        <div class="space-y-1">
          <div class="text-xs text-[#848e9c] uppercase tracking-wide">Strategy Status</div>
          <div class="flex items-center gap-2">
            <div class={`h-2 w-2 rounded-full ${strategyRunning ? "bg-[#02c076]" : "bg-[#f6465d]"}`}></div>
            <span class="text-sm md:text-base font-semibold text-[#f0f0f0]">
              {strategyRunning ? "RUNNING" : "STOPPED"}
            </span>
            <Button
              variant="outline"
              size="sm"
              onclick={toggleStrategy}
              class={`h-6 text-xs ml-auto ${
                strategyRunning ? "text-[#f6465d] border-[#f6465d]" : "text-[#02c076] border-[#02c076]"
              } bg-transparent hover:bg-[#3c4043]`}
            >
              {strategyRunning ? "STOP" : "START"}
            </Button>
          </div>
        </div>

        <div class="space-y-1">
          <div class="text-xs text-[#848e9c] uppercase tracking-wide">Active Positions</div>
          <div class="flex items-baseline gap-1">
            <span class="text-lg md:text-xl font-bold text-[#f0f0f0] font-mono">2</span>
            <span class="text-xs text-[#848e9c]">/ 3 MAX</span>
          </div>
        </div>

        <div class="space-y-1">
          <div class="text-xs text-[#848e9c] uppercase tracking-wide">Daily PNL</div>
          <div class="flex items-center gap-2">
            <span class="text-lg md:text-xl font-bold text-[#f6465d] font-mono">-$521.35</span>
            <div class="px-1.5 py-0.5 text-xs bg-[#2d1b1e] text-[#f6465d] rounded flex items-center">
              <ArrowDown class="h-3 w-3 mr-1" />
              5.2%
            </div>
          </div>
        </div>

        <div class="space-y-1">
          <div class="text-xs text-[#848e9c] uppercase tracking-wide">Signals (1H)</div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-1">
                <ArrowUp class="h-3 w-3 text-[#02c076]" />
                <span class="text-sm font-mono text-[#f0f0f0]">3</span>
              </div>
              <div class="flex items-center gap-1">
                <ArrowDown class="h-3 w-3 text-[#f6465d]" />
                <span class="text-sm font-mono text-[#f0f0f0]">2</span>
              </div>
            </div>
            <span class="text-xs text-[#848e9c]">14:32:45</span>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div class="lg:col-span-2 space-y-4 md:space-y-6">
        <Card.Root class="bg-[#2b3139] border-[#3c4043] rounded-lg">
          <Card.Header class="py-3 px-4 border-b border-[#3c4043]">
            <Card.Title class="text-sm text-[#848e9c] uppercase tracking-wide">Active Positions</Card.Title>
          </Card.Header>
          <Card.Content class="p-0">
            <PositionsTable />
          </Card.Content>
        </Card.Root>
        
        <Card.Root class="bg-[#2b3139] border-[#3c4043] rounded-lg">
          <Card.Header  class="py-3 px-4 border-b border-[#3c4043] flex flex-row items-center justify-between">
            <Card.Title class="text-sm text-[#848e9c] uppercase tracking-wide">Market Chart</Card.Title>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-[#02c076] font-semibold">BTC/USDT</span>
              <span class="text-xs text-[#848e9c]">1H</span>
            </div>
          </Card.Header>
          <Card.Content class="p-0">
            <TradingChart />
            <!-- <div class="h-full w-full bg-[#1e2329]">
              i am trading chart
            </div> -->
          </Card.Content>
        </Card.Root>        
      </div>
      <div class="space-y-4 md:space-y-6">
        <Card.Root class="bg-[#2b3139] border-[#3c4043] rounded-lg">
          <Card.Header class="py-3 px-4 border-b border-[#3c4043] flex flex-row items-center justify-between">
            <Card.Title class="text-sm text-[#848e9c] uppercase tracking-wide flex items-center gap-2">
              <FileText class="h-4 w-4" />
              Recent Logs
            </Card.Title>
            <Button variant="ghost" size="sm" class="text-xs text-[#fcd535] hover:bg-[#3c4043]">
              View All
            </Button>
          </Card.Header>
          <Card.Content class="p-0">
            <DashboardLogs />
          </Card.Content>
        </Card.Root>

        <Card.Root class="bg-[#2b3139] border-[#3c4043] rounded-lg">
          <Card.Header class="py-3 px-4 border-b border-[#3c4043] flex flex-row items-center justify-between">
            <Card.Title class="text-sm text-[#848e9c] uppercase tracking-wide flex items-center gap-2">
              <TrendingUp class="h-4 w-4" />
              Backtest Preview
            </Card.Title>
            <Button variant="ghost" size="sm" class="text-xs text-[#fcd535] hover:bg-[#3c4043]">
              Run Full
            </Button>
          </Card.Header>
          <Card.Content class="p-0">
            <BacktestPreview />
          </Card.Content>
        </Card.Root>

        <Card.Root class="bg-[#2b3139] border-[#3c4043] rounded-lg">
          <Card.Header class="py-3 px-4 border-b border-[#3c4043]">
            <Card.Title class="text-sm text-[#848e9c] uppercase tracking-wide flex items-center gap-2">
              <Activity class="h-4 w-4" />
              System Status
            </Card.Title>
          </Card.Header>
          <Card.Content class="p-4 space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-xs text-[#848e9c]">CPU Usage</span>
              <span class="text-sm font-mono text-[#f0f0f0]">12%</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs text-[#848e9c]">Memory</span>
              <span class="text-sm font-mono text-[#f0f0f0]">1.2GB</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs text-[#848e9c]">Uptime</span>
              <span class="text-sm font-mono text-[#f0f0f0]">3d 7h 22m</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs text-[#848e9c]">API Status</span>
              <span class="text-sm font-semibold text-[#02c076]">CONNECTED</span>
            </div>
          </Card.Content>
        </Card.Root>
      </div>
    </div>
  </div>
</MainLayout>