<script lang="ts">
    import { page } from "$app/stores";
    import { RefreshCw, ArrowUp, ArrowDown, AlertCircle } from "lucide-svelte" 
	import MainLayout from "../MainLayout.svelte";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Alert from "$lib/components/ui/alert/index.js";
    import PositionsTable from "$lib/components/dashboard/PositionsTable.svelte"
    import { onMount } from "svelte";

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

    onMount(() => {
        // 컴포넌트 마운트 시 현재 시간으로 마지막 업데이트 시간 설정
        lastUpdated = new Date()
    })

</script>

<MainLayout>        
    <div class="p-4 space-y-4">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <div class="h-3 w-3 rounded-full bg-[#3fb950] mr-2"></div>
            <span class="text-sm font-bold">TRADING DASHBOARD</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-xs text-[#8b949e]">Last updated: {lastUpdated.toLocaleTimeString()}</span>
            <Button
              variant="outline"
              size="sm"
              onclick={refreshData}
              disabled={isRefreshing}
              class="h-7 w-7 p-0 bg-[#0d1117] border-[#30363d] hover:bg-[#1f2937] rounded-none"
            >
              <RefreshCw class={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
              <span class="sr-only">Refresh</span>
            </Button>
          </div>
        </div>
  
        {#if showAlert}
          <Alert.Root className="bg-[#2d1213] border-[#f85149] text-[#f85149] rounded-none">
            <Alert.Title>
              <AlertCircle class="h-4 w-4" />
            </Alert.Title>
            <Alert.Description class="text-xs flex items-center justify-between">
              <span>Daily loss limit reached (-5.2%). New positions are disabled.</span>
              <Button variant="ghost" size="sm" onclick={() => showAlert = false} class="h-5 p-0">
                <span class="text-xs">DISMISS</span>
              </Button>
            </Alert.Description>
          </Alert.Root>
        {/if}
  
        <div class="grid grid-cols-4 gap-4">
          <Card.Root class="terminal-section">
            <Card.Header class="py-2 px-3 border-b border-[#30363d]">
              <Card.Title class="text-xs text-[#8b949e]">STRATEGY STATUS</Card.Title>
            </Card.Header>
            <Card.Content class="p-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class={`h-2 w-2 rounded-full ${strategyRunning ? "bg-[#3fb950]" : "bg-[#f85149]"} mr-2`}></div>
                  <span class="text-sm text-white">{strategyRunning ? "RUNNING" : "STOPPED"}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onclick={toggleStrategy}
                  class={`h-7 text-xs ${
                    strategyRunning ? "text-[#f85149]" : "text-[#3fb950]"
                  } bg-[#0d1117] border-[#30363d] hover:bg-[#1f2937] rounded-none`}
                >
                  {strategyRunning ? "STOP" : "START"}
                </Button>   
              </div>
            </Card.Content>
          </Card.Root>
  
          <Card.Root class="terminal-section">
            <Card.Header class="py-2 px-3 border-b border-[#30363d]">
              <Card.Title class="text-xs text-[#8b949e]">POSITIONS</Card.Title>
            </Card.Header>
            <Card.Content class="p-3">
              <div class="flex items-center justify-between">
                <span class="text-sm font-mono text-white">2 / 3</span>
                <span class="text-xs text-[#8b949e]">ACTIVE / MAX</span>
              </div>
            </Card.Content>
          </Card.Root>
  
          <Card.Root class="terminal-section">
            <Card.Header class="py-2 px-3 border-b border-[#30363d]">
              <Card.Title class="text-xs text-[#8b949e]">DAILY PNL</Card.Title>
            </Card.Header>
            <Card.Content class="p-3">
              <div class="flex items-center">
                <span class="text-sm text-[#f85149] font-mono">-$521.35</span>
                <div class="ml-2 px-1 text-xs bg-[#2d1213] text-[#f85149] flex items-center">
                  <ArrowDown class="h-3 w-3 mr-1" />
                  5.2%
                </div>
              </div>
            </Card.Content>
          </Card.Root>
  
          <Card.Root class="terminal-section">
            <Card.Header class="py-2 px-3 border-b border-[#30363d]">
              <Card.Title class="text-xs text-[#8b949e]">SIGNALS (1H)</Card.Title>
            </Card.Header>
            <Card.Content class="p-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="flex items-center">
                    <ArrowUp class="h-3 w-3 text-[#3fb950] mr-1" />
                    <span class="text-sm font-mono text-white">3</span>
                  </div>
                  <div class="flex items-center">
                    <ArrowDown class="h-3 w-3 text-[#f85149] mr-1" />
                    <span class="text-sm font-mono text-white">2</span>
                  </div>
                </div>
                <span class="text-xs text-[#8b949e]">LAST: 14:32:45</span>
              </div>
            </Card.Content>
          </Card.Root>
        </div>
  
        <Card.Root class="terminal-section gap-0 p-0">
          <Card.Header class="px-3 border-b border-[#30363d] pt-6">
            <Card.Title class="text-xs text-[#8b949e] ">
                <div class="flex items-center">
                    ACTIVE POSITIONS                    
                </div>
            </Card.Title>
          </Card.Header>
          <Card.Content class="p-0">
            <PositionsTable />
          </Card.Content>
        </Card.Root>
  
        <Card.Root class="terminal-section">
          <Card.Header class="py-2 px-3 border-b border-[#30363d] flex items-center justify-between">
            <Card.Title class="text-xs text-[#8b949e]">MARKET CHART</Card.Title>
            <div class="flex items-center space-x-2">
              <span class="text-xs text-[#3fb950]">BTC/USDT</span>
              <span class="text-xs text-[#8b949e]">1H</span>
            </div>
          </Card.Header>
          <Card.Content class="p-0">
            <div>i'm chart</div>
            <!-- <TradingChart /> -->
          </Card.Content>
        </Card.Root>
      </div>
</MainLayout>