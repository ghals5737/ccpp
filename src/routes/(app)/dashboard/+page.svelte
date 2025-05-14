<script lang="ts">    
    import Card from "$lib/components/ui/card/Card.svelte";
    import CardHeader from "$lib/components/ui/card/CardHeader.svelte";
    import CardTitle from "$lib/components/ui/card/CardTitle.svelte";
    import CardDescription from "$lib/components/ui/card/CardDescription.svelte";
    import CardContent from "$lib/components/ui/card/CardContent.svelte";
    import Button from "$lib/components/ui/button/Button.svelte";
    import Badge from "$lib/components/ui/badge/Badge.svelte";
    import Alert from "$lib/components/ui/alert/Alert.svelte";
    import AlertTitle from "$lib/components/ui/alert/AlertTitle.svelte";
    import AlertDescription from "$lib/components/ui/alert/AlertDescription.svelte";
    import { AlertCircle, ArrowUp, Clock, Play, Square, Trash2, ArrowDown } from "lucide-svelte";
    import PositionsTable from "$lib/components/dashboard/PositionsTable.svelte";
    import TradingLogs from "$lib/components/dashboard/TradingLogs.svelte";


    let botRunning = true
    let showAlert = true

    const toggleBotStatus = () => {
        botRunning = !botRunning
    }

    const currentTime = new Date().toLocaleTimeString()
    const currentDate = new Date().toLocaleDateString()

    function setShowAlert(showAlert: boolean) {
        showAlert = showAlert
    }
</script>

<div class="p-4 space-y-4">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center">
        <div class="h-3 w-3 rounded-full bg-[#3fb950] mr-2"></div>
        <span class="text-sm font-bold">SYSTEM MONITOR</span>
      </div>
      <div class="flex items-center text-xs text-[#8b949e]">
        <Clock class="h-3 w-3 mr-1" />
        <span>
          {currentTime} | {currentDate}
        </span>
      </div>
    </div>

    {#if showAlert}
      <Alert className="bg-[#2d1213] border-[#f85149] text-[#f85149] rounded-none">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="text-xs font-bold">CONNECTION ERROR</AlertTitle>
        <AlertDescription className="text-xs flex items-center justify-between">
          <span>API connection failed. Check configuration in settings.</span>
          <Button variant="ghost" size="sm" onClick={() => setShowAlert(false)} className="h-5 p-0">
            <Trash2 className="h-3 w-3 text-[#8b949e]" />
          </Button>
        </AlertDescription>
      </Alert>
    {/if}

    <div class="grid grid-cols-3 gap-4">
      <Card class="terminal-section">
        <CardHeader class="py-2 px-3 border-b border-[#30363d]">
          <CardTitle class="text-xs text-[#8b949e]">PROCESS STATUS</CardTitle>
        </CardHeader>
        <CardContent class="p-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class={`h-2 w-2 rounded-full ${botRunning ? "bg-[#3fb950]" : "bg-[#f85149]"} mr-2`}></div>
              <span class="text-sm">{botRunning ? "RUNNING" : "STOPPED"}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleBotStatus}
              class={`h-7 text-xs ${botRunning ? "text-[#f85149]" : "text-[#3fb950]"} bg-[#0d1117] border-[#30363d] hover:bg-[#1f2937]`}
            >
              {#if botRunning}
                <Square class="h-3 w-3 mr-1" />
              {:else}
                <Play class="h-3 w-3 mr-1" />
              {/if}
              {botRunning ? "STOP" : "START"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card class="terminal-section">
        <CardHeader class="py-2 px-3 border-b border-[#30363d]">
          <CardTitle class="text-xs text-[#8b949e]">PERFORMANCE METRICS</CardTitle>
        </CardHeader>
        <CardContent class="p-3">
          <div class="flex items-center">
            <span class="text-sm text-[#3fb950] font-mono">+$1,234.56</span>
            <div class="ml-2 px-1 text-xs bg-[#1e3a2f] text-[#3fb950] flex items-center">
              <ArrowUp class="h-3 w-3 mr-1" />
              8.2%
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="terminal-section">
        <CardHeader class="py-2 px-3 border-b border-[#30363d]">
          <CardTitle class="text-xs text-[#8b949e]">SYSTEM TIME</CardTitle>
        </CardHeader>
        <CardContent class="p-3">
          <div class="flex items-center">
            <span class="text-sm font-mono">{currentTime}</span>
            <Clock class="ml-2 h-3 w-3 text-[#8b949e]" />
          </div>
          <div class="text-xs text-[#8b949e] font-mono mt-1">{currentDate}</div>
        </CardContent>
      </Card>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <Card class="terminal-section">
        <CardHeader class="py-2 px-3 border-b border-[#30363d]">
          <CardTitle class="text-xs text-[#8b949e]">ACTIVE POSITIONS</CardTitle>
        </CardHeader>
        <CardContent class="p-0">
          <PositionsTable />
        </CardContent>
      </Card>

      <Card class="terminal-section">
        <CardHeader class="py-2 px-3 border-b border-[#30363d]">
          <CardTitle class="text-xs text-[#8b949e]">SYSTEM LOGS</CardTitle>
        </CardHeader>
        <CardContent class="p-0">
          <TradingLogs />
        </CardContent>
      </Card>
    </div>

    <Card class="terminal-section">
      <CardHeader class="py-2 px-3 border-b border-[#30363d]">
        <CardTitle class="text-xs text-[#8b949e]">MARKET DATA</CardTitle>
      </CardHeader>
      <CardContent class="p-0">
        <div class="p-3 font-mono">
          <div class="grid grid-cols-4 gap-4">
            <div class="space-y-1">
              <div class="text-xs text-[#8b949e]">BTC/USDT</div>
              <div class="text-sm text-[#3fb950] font-bold">$66,789.25</div>
              <div class="text-xs text-[#3fb950] flex items-center">
                <ArrowUp class="h-3 w-3 mr-1" />
                2.07%
              </div>
            </div>
            <div class="space-y-1">
              <div class="text-xs text-[#8b949e]">ETH/USDT</div>
              <div class="text-sm text-[#f85149] font-bold">$3,321.50</div>
              <div class="text-xs text-[#f85149] flex items-center">
                <ArrowDown class="h-3 w-3 mr-1" />
                1.25%
              </div>
            </div>
            <div class="space-y-1">
              <div class="text-xs text-[#8b949e]">SOL/USDT</div>
              <div class="text-sm text-[#3fb950] font-bold">$142.75</div>
              <div class="text-xs text-[#3fb950] flex items-center">
                <ArrowUp class="h-3 w-3 mr-1" />
                0.85%
              </div>
            </div>
            <div class="space-y-1">
              <div class="text-xs text-[#8b949e]">XRP/USDT</div>
              <div class="text-sm text-[#f85149] font-bold">$0.5423</div>
              <div class="text-xs text-[#f85149] flex items-center">
                <ArrowDown class="h-3 w-3 mr-1" />
                0.32%
              </div>
            </div>
          </div>

          <div class="mt-4 border-t border-[#30363d] pt-3">
            <div class="text-xs text-[#8b949e] mb-2">MARKET UPDATES</div>
            <div class="space-y-1">
              <div class="log-entry">
                <span class="log-time">[14:32:45]</span> <span class="log-info">BTC/USDT</span>{" "}
                <span>price updated to</span> <span class="log-success">$66,789.25</span>
              </div>
              <div class="log-entry">
                <span class="log-time">[14:30:12]</span> <span class="log-info">ETH/USDT</span>{" "}
                <span>price updated to</span> <span class="log-error">$3,321.50</span>
              </div>
              <div class="log-entry">
                <span class="log-time">[14:28:33]</span> <span class="log-info">SOL/USDT</span>{" "}
                <span>price updated to</span> <span class="log-success">$142.75</span>
              </div>
              <div class="log-entry">
                <span class="log-time">[14:25:18]</span> <span class="log-info">XRP/USDT</span>{" "}
                <span>price updated to</span> <span class="log-error">$0.5423</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>