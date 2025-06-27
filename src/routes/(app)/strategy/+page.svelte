<script lang="ts">
    import { RefreshCw, ArrowUp, ArrowDown, Info, Settings, TrendingUp, Square, Play, AlertTriangle } from "lucide-svelte"
	import MainLayout from "../MainLayout.svelte";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";    
    import * as Tooltip from "$lib/components/ui/tooltip/index.js";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Slider } from "$lib/components/ui/slider/index.js";

    let strategyRunning = $state(true)
    let isRefreshing = $state(false)
    let lastUpdated = $state(new Date())
    let riskRatio = $state([2])
    let maxPositions = $state([3])
    let stopLossPercent = $state([1.5])
    let takeProfitPercent = $state([3])
    let dailyLossLimit = $state(true)
    let autoRestart = $state(false)
    let trailingStop = $state(false)
    let partialTakeProfit = $state(false)


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

    const sendManualSignal = (type: string) => {
        alert(`Manual ${type} signal sent!`)
    }
</script>

<MainLayout>
    <div class="p-4 space-y-6 bg-[#1e2329] min-h-screen">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <Settings class="h-5 w-5 text-[#fcd535]" />
              <span class="text-lg font-bold text-[#f0f0f0]">STRATEGY CONTROL</span>
            </div>
            <Badge
              variant="outline"
              class={`${strategyRunning ? "bg-[#02c076]/10 text-[#02c076] border-[#02c076]" : "bg-[#f6465d]/10 text-[#f6465d] border-[#f6465d]"}`}
            >
              {strategyRunning ? "ACTIVE" : "INACTIVE"}
            </Badge>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-sm text-[#848e9c]">Last updated: {lastUpdated.toLocaleTimeString()}</span>
            <Button
              variant="outline"
              size="sm"
              onclick={refreshData}
              disabled={isRefreshing}
              class="bg-[#2b3139] border-[#3c4043] text-[#f0f0f0] hover:bg-[#3c4043]"
            >
              <RefreshCw class={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
  
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card.Root class="bg-[#2b3139] border-[#3c4043]">
            <Card.Header class="pb-3">
              <Card.Title class="text-sm text-[#848e9c] flex items-center gap-2">
                <TrendingUp class="h-4 w-4" />
                STRATEGY STATUS
              </Card.Title>
            </Card.Header>
            <Card.Content class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class={`h-3 w-3 rounded-full ${strategyRunning ? "bg-[#02c076]" : "bg-[#f6465d]"}`}></div>
                  <span class="text-[#f0f0f0] font-medium">{strategyRunning ? "RUNNING" : "STOPPED"}</span>
                </div>
                <Button
                  size="sm"
                  onclick={toggleStrategy}
                  class={`${
                    strategyRunning
                      ? "bg-[#f6465d] hover:bg-[#f6465d]/80 text-white"
                      : "bg-[#02c076] hover:bg-[#02c076]/80 text-white"
                  }`}
                >
                  {#if strategyRunning}
                    <Square class="h-4 w-4 mr-1" />
                  {:else}
                    <Play class="h-4 w-4 mr-1" />
                  {/if}
                  {strategyRunning ? "STOP" : "START"}
                </Button>
              </div>
  
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <Label for="daily-loss-limit" class="text-sm text-[#f0f0f0]">
                    Daily Loss Limit (-5%)
                  </Label>
                  <Switch
                    id="daily-loss-limit"
                    bind:checked={dailyLossLimit}
                    class="data-[state=checked]:bg-[#02c076]"
                  />
                </div>
                <p class="text-xs text-[#848e9c]">Automatically stop trading when daily loss exceeds 5%</p>
              </div>
  
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <Label for="auto-restart" class="text-sm text-[#f0f0f0]">
                    Auto Restart (Daily)
                  </Label>
                  <Switch
                    id="auto-restart"
                    bind:checked={autoRestart}
                    class="data-[state=checked]:bg-[#02c076]"
                  />
                </div>
                <p class="text-xs text-[#848e9c]">Automatically restart strategy at 00:00 UTC</p>
              </div>
            </Card.Content>
          </Card.Root>
  
          <Card.Root class="bg-[#2b3139] border-[#3c4043] lg:col-span-2">
            <Card.Header class="pb-3">
              <Card.Title class="text-sm text-[#848e9c] flex items-center gap-2">
                <AlertTriangle class="h-4 w-4" />
                RISK MANAGEMENT
              </Card.Title>
            </Card.Header>
            <Card.Content class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <Label class="text-sm text-[#f0f0f0]">Risk Per Trade</Label>
                    <span class="text-sm font-mono text-[#fcd535]">{riskRatio[0]}%</span>
                  </div>
                  <Slider
                    type="multiple"
                    min={0.5}
                    max={5}
                    step={0.5}
                    bind:value={riskRatio}
                    class="[&_[role=slider]]:bg-[#fcd535] [&_[role=slider]]:border-[#fcd535]"
                  />
                </div>
  
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <Label class="text-sm text-[#f0f0f0]">Max Positions</Label>
                    <span class="text-sm font-mono text-[#fcd535]">{maxPositions[0]}</span>
                  </div>
                  <Slider
                    type="multiple"
                    min={1}
                    max={5}
                    step={1}
                    bind:value={maxPositions}
                    class="[&_[role=slider]]:bg-[#fcd535] [&_[role=slider]]:border-[#fcd535]"
                  />
                </div>
  
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <Label class="text-sm text-[#f0f0f0]">Stop Loss</Label>
                    <span class="text-sm font-mono text-[#f6465d]">{stopLossPercent[0]}%</span>
                  </div>
                  <Slider
                    type="multiple"
                    min={0.5}
                    max={5}
                    step={0.5}
                    bind:value={stopLossPercent}
                    class="[&_[role=slider]]:bg-[#f6465d] [&_[role=slider]]:border-[#f6465d]"
                  />
                </div>
  
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <Label class="text-sm text-[#f0f0f0]">Take Profit</Label>
                    <span class="text-sm font-mono text-[#02c076]">{takeProfitPercent[0]}%</span>
                  </div>
                  <Slider
                    type="multiple"
                    min={1}
                    max={10}
                    step={0.5}
                    bind:value={takeProfitPercent}
                    class="[&_[role=slider]]:bg-[#02c076] [&_[role=slider]]:border-[#02c076]"
                  />
                </div>
              </div>
  
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#3c4043]">
                <div class="flex items-center justify-between">
                  <Label for="trailing-stop" class="text-sm text-[#f0f0f0]">
                    Trailing Stop
                  </Label>
                  <Switch
                    id="trailing-stop"
                    bind:checked={trailingStop}
                    class="data-[state=checked]:bg-[#02c076]"
                  />
                </div>
                <div class="flex items-center justify-between">
                  <Label for="partial-tp" class="text-sm text-[#f0f0f0]">
                    Partial Take Profit
                  </Label>
                  <Switch
                    id="partial-tp"
                    bind:checked={partialTakeProfit}
                    class="data-[state=checked]:bg-[#02c076]"
                  />
                </div>
              </div>
  
              <div class="flex justify-end pt-4">
                <Button class="bg-[#fcd535] text-[#1e2329] hover:bg-[#fcd535]/80 font-medium">SAVE PARAMETERS</Button>
              </div>
            </Card.Content>
            </Card.Root>
        </div>
  
        <Card.Root class="bg-[#2b3139] border-[#3c4043]">
          <Card.Header class="pb-3">
            <Card.Title class="text-sm text-[#848e9c]">MANUAL SIGNAL GENERATOR</Card.Title>
          </Card.Header>
          <Card.Content>
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger >
                  <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div class="flex gap-3">
                      <Button
                        size="sm"
                        onclick={() => sendManualSignal("LONG")}
                        class="bg-[#02c076] hover:bg-[#02c076]/80 text-white"
                      >
                        <ArrowUp class="h-4 w-4 mr-2" />
                        GENERATE LONG SIGNAL
                      </Button>
                      <Button
                        size="sm"
                        onclick={() => sendManualSignal("SHORT")}
                        class="bg-[#f6465d] hover:bg-[#f6465d]/80 text-white"
                      >
                        <ArrowDown class="h-4 w-4 mr-2" />
                        GENERATE SHORT SIGNAL
                      </Button>
                    </div>
                    <div class="flex items-center gap-2">
                      <Info class="h-4 w-4 text-[#848e9c]" />
                      <span class="text-xs text-[#848e9c]">For testing purposes only</span>
                    </div>
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content class="bg-[#2b3139] border-[#3c4043] text-[#f0f0f0]">
                  <p>Signals will be processed according to current strategy parameters</p>
                </Tooltip.Content>
              </Tooltip.Root>   
            </Tooltip.Provider>
          </Card.Content>
        </Card.Root>
  
        <Card.Root class="bg-[#2b3139] border-[#3c4043]">
          <Card.Header class="pb-3">
            <Card.Title class="text-sm text-[#848e9c]">STRATEGY RULES</Card.Title>
          </Card.Header>
          <Card.Content>
            <Tabs.Root value="entry" class="w-full">
              <Tabs.List class="w-full grid grid-cols-3 bg-[#1e2329] p-1 h-auto">
                {#each ["entry", "exit", "filters"] as tab}
                  <Tabs.Trigger
                    value={tab}
                    class="text-xs py-2 data-[state=active]:bg-[#fcd535] data-[state=active]:text-[#1e2329] data-[state=inactive]:text-[#848e9c] data-[state=inactive]:hover:text-[#f0f0f0]"
                  >
                    {tab.toUpperCase()} RULES
                  </Tabs.Trigger>
                {/each}
              </Tabs.List>
  
              <Tabs.Content value="entry" class="mt-6">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div class="space-y-3">
                    <h4 class="text-sm font-medium text-[#02c076]">LONG ENTRY CONDITIONS</h4>
                    <div class="bg-[#1e2329] border border-[#3c4043] p-4 rounded-lg">
                      <div class="space-y-2 font-mono text-sm text-[#f0f0f0]">
                        <p>• EMA(9) crosses above EMA(21)</p>
                        <p>• AND RSI(14) &lt; 70</p>
                        <p>• AND MACD Signal &gt; 0</p>
                        <p>• AND Volume &gt; 20-period average</p>
                      </div>
                    </div>
                  </div>
                  <div class="space-y-3">
                    <h4 class="text-sm font-medium text-[#f6465d]">SHORT ENTRY CONDITIONS</h4>
                    <div class="bg-[#1e2329] border border-[#3c4043] p-4 rounded-lg">
                      <div class="space-y-2 font-mono text-sm text-[#f0f0f0]">
                        <p>• EMA(9) crosses below EMA(21)</p>
                        <p>• AND RSI(14) &gt; 30</p>
                        <p>• AND MACD Signal &lt; 0</p>
                        <p>• AND Volume &gt; 20-period average</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs.Content>
  
              <Tabs.Content value="exit" class="mt-6">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div class="space-y-3">
                    <h4 class="text-sm font-medium text-[#02c076]">LONG EXIT CONDITIONS</h4>
                    <div class="bg-[#1e2329] border border-[#3c4043] p-4 rounded-lg">
                      <div class="space-y-2 font-mono text-sm text-[#f0f0f0]">
                        <p>• Price hits take profit ({takeProfitPercent[0]}%)</p>
                        <p>• OR Price hits stop loss ({stopLossPercent[0]}%)</p>
                        <p>• OR EMA(9) crosses below EMA(21)</p>
                        <p>• OR RSI(14) &gt; 80 (overbought)</p>
                      </div>
                    </div>
                  </div>
                  <div class="space-y-3">
                    <h4 class="text-sm font-medium text-[#f6465d]">SHORT EXIT CONDITIONS</h4>
                    <div class="bg-[#1e2329] border border-[#3c4043] p-4 rounded-lg">
                      <div class="space-y-2 font-mono text-sm text-[#f0f0f0]">
                        <p>• Price hits take profit ({takeProfitPercent[0]}%)</p>
                        <p>• OR Price hits stop loss ({stopLossPercent[0]}%)</p>
                        <p>• OR EMA(9) crosses above EMA(21)</p>
                        <p>• OR RSI(14) &lt; 20 (oversold)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs.Content>
  
              <Tabs.Content value="filters" class="mt-6">
                <div class="space-y-4">
                  <h4 class="text-sm font-medium text-[#fcd535]">MARKET FILTERS</h4>
                  <div class="bg-[#1e2329] border border-[#3c4043] p-4 rounded-lg">
                    <div class="space-y-2 font-mono text-sm text-[#f0f0f0]">
                      <p>• Market volatility &lt; 5% (daily)</p>
                      <p>• No major news events scheduled</p>
                      <p>• Market hours: 00:00 - 23:59 UTC</p>
                      <p>• Minimum spread: &lt; 0.1%</p>
                      <p>• Daily loss limit: -5%</p>
                      <p>• Maximum drawdown: -10%</p>
                    </div>
                  </div>
                </div>
              </Tabs.Content>
            </Tabs.Root>
          </Card.Content>
        </Card.Root>
  
        <Card.Root class="bg-[#2b3139] border-[#3c4043]">
          <Card.Header class="pb-3">
            <Card.Title class="text-sm text-[#848e9c]">CURRENT STRATEGY PERFORMANCE</Card.Title>
          </Card.Header>
          <Card.Content>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div class="text-center">
                <div class="text-2xl font-bold text-[#02c076]">73.2%</div>
                <div class="text-xs text-[#848e9c]">Win Rate</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-[#fcd535]">2.4</div>
                <div class="text-xs text-[#848e9c]">Profit Factor</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-[#f0f0f0]">156</div>
                <div class="text-xs text-[#848e9c]">Total Trades</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-[#02c076]">+23.7%</div>
                <div class="text-xs text-[#848e9c]">Total Return</div>
              </div>
            </div>
          </Card.Content>
        </Card.Root>
      </div>
</MainLayout>

