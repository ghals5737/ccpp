<script lang="ts">
    import { RefreshCw, Filter, Download } from "lucide-svelte"
    import * as Card from "$lib/components/ui/card/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
	import MainLayout from "../MainLayout.svelte";

    const logs = [
        {
            id: 1,
            timestamp: "2025-05-21 14:32:45",
            type: "INFO",
            message: "Strategy started successfully",
        },
        {
            id: 2,
            timestamp: "2025-05-21 14:32:47",
            type: "INFO",
            message: "Connected to exchange API",
        },
        {
            id: 3,
            timestamp: "2025-05-21 14:35:12",
            type: "SIGNAL",
            message: "BUY signal detected for BTC/USDT",
        },
        {
            id: 4,
            timestamp: "2025-05-21 14:35:15",
            type: "ORDER",
            message: "LONG position opened: BTC/USDT @ $66789.25 x 0.5",
        },
        {
            id: 5,
            timestamp: "2025-05-21 14:45:33",
            type: "SIGNAL",
            message: "SELL signal detected for ETH/USDT",
        },
        {
            id: 6,
            timestamp: "2025-05-21 14:45:36",
            type: "ORDER",
            message: "SHORT position opened: ETH/USDT @ $3456.75 x 2.0",
        },
        {
            id: 7,
            timestamp: "2025-05-21 15:12:18",
            type: "WARNING",
            message: "Daily loss approaching limit (-4.8%)",
        },
        {
            id: 8,
            timestamp: "2025-05-21 15:30:05",
            type: "ERROR",
            message: "API connection timeout, retrying...",
        },
        {
            id: 9,
            timestamp: "2025-05-21 15:30:12",
            type: "INFO",
            message: "API connection restored",
        },
        {
            id: 10,
            timestamp: "2025-05-21 15:45:22",
            type: "ORDER",
            message: "SHORT position closed: ETH/USDT @ $3321.50 with profit $135.25 (3.91%)",
        },
        {
            id: 11,
            timestamp: "2025-05-21 16:02:45",
            type: "SIGNAL",
            message: "BUY signal detected for SOL/USDT",
        },
        {
            id: 12,
            timestamp: "2025-05-21 16:02:48",
            type: "ORDER",
            message: "LONG position opened: SOL/USDT @ $145.25 x 10.0",
        },
        {
            id: 13,
            timestamp: "2025-05-21 16:15:33",
            type: "WARNING",
            message: "Daily loss limit reached (-5.2%)",
        },
        {
            id: 14,
            timestamp: "2025-05-21 16:15:35",
            type: "INFO",
            message: "New positions disabled due to daily loss limit",
        },
        {
            id: 15,
            timestamp: "2025-05-21 16:30:42",
            type: "ORDER",
            message: "LONG position closed: SOL/USDT @ $142.75 with loss -$2.50 (-1.72%)",
        },
    ]

    let isRefreshing = $state(false)
    let lastUpdated = $state(new Date())
    let filter = $state("all")

    const refreshData = () => {
        isRefreshing = true
        setTimeout(() => {
        isRefreshing = false
        lastUpdated = new Date()
        }, 800)
    }

    const downloadLogs = () => {
        alert("Logs downloaded successfully!")
    }

    const getLogTypeClass = (type: string) => {
        switch (type) {
        case "INFO":
            return "text-[#58a6ff]"
        case "WARNING":
            return "text-[#d29922]"
        case "ERROR":
            return "text-[#f85149]"
        case "SIGNAL":
            return "text-[#3fb950]"
        case "ORDER":
            return "text-[#8b949e]"
        default:
            return "text-[#e6edf3]"
        }
    }

    const filteredLogs = filter === "all" ? logs : logs.filter((log) => log.type.toLowerCase() === filter.toLowerCase())
</script>

<MainLayout>
    <div class="p-4 space-y-4">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <div class="h-3 w-3 rounded-full bg-[#8b949e] mr-2"></div>
            <span class="text-sm font-bold">SYSTEM LOGS</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-xs text-[#8b949e]">Last updated: {lastUpdated.toLocaleTimeString()}</span>
            <Button
              variant="outline"
              size="sm"
              onclick={refreshData}
              disabled={isRefreshing}
              class="h-7 w-7 p-0 bg-[#0d1117] border-[#30363d] hover:bg-[#1f2937]"
            >
              <RefreshCw class={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
              <span class="sr-only">Refresh</span>
            </Button>
          </div>
        </div>
  
        <Card.Root class="terminal-section">
          <Card.Header class="py-2 px-3 border-b border-[#30363d] flex items-center justify-between">
            <Card.Title class="text-xs text-[#8b949e]">SYSTEM LOGS</Card.Title>
            <div class="flex items-center space-x-2">
              <Select.Root type="single" bind:value={filter}>
                <Select.Trigger class="w-[120px] h-7 text-xs bg-[#161b22] border-[#30363d]">
                  <Filter class="h-3 w-3 mr-2" />
                  {filter}
                </Select.Trigger>
                <Select.Content class="bg-[#161b22] border-[#30363d] text-xs">
                  <Select.Item value="all" class="text-xs">
                    ALL LOGS
                  </Select.Item>
                  <Select.Item value="info" class="text-xs">
                    INFO
                  </Select.Item>
                  <Select.Item value="warning" class="text-xs">
                    WARNING
                  </Select.Item>
                  <Select.Item value="error" class="text-xs">
                    ERROR
                  </Select.Item>
                  <Select.Item value="signal" class="text-xs">
                    SIGNAL
                  </Select.Item>
                  <Select.Item value="order" class="text-xs">
                    ORDER
                  </Select.Item>
                </Select.Content>
              </Select.Root>
              <Button
                variant="outline"
                size="sm"
                onclick={downloadLogs}
                class="h-7 text-xs bg-[#161b22] border-[#30363d] hover:bg-[#1f2937]"
              >
                <Download class="h-3 w-3 mr-1" />
                EXPORT
              </Button>
            </div>
          </Card.Header>
          <Card.Content class="p-0">
            <ScrollArea class="h-[600px] terminal-scrollbar">
              <div class="p-3 font-mono">
                {#each filteredLogs as log}
                  <div class="log-entry">
                    <span class="log-time">[{log.timestamp}]</span>{" "}
                    <span class={getLogTypeClass(log.type)}>[{log.type}]</span>{" "}
                    <span class="text-[#e6edf3]">{log.message}</span>
                  </div>
                {/each}
              </div>
            </ScrollArea>
          </Card.Content>
        </Card.Root>
  
        <Card.Root class="terminal-section">
          <Card.Header class="py-2 px-3 border-b border-[#30363d]">
            <Card.Title class="text-xs text-[#8b949e]">LOG STATISTICS</Card.Title>
          </Card.Header>
          <Card.Content class="p-3">
            <div class="grid grid-cols-5 gap-4">
              <div class="space-y-1">
                <div class="text-xs text-[#8b949e]">TOTAL LOGS</div>
                <div class="text-sm font-mono">{logs.length}</div>
              </div>
              <div class="space-y-1">
                <div class="text-xs text-[#8b949e]">INFO</div>
                <div class="text-sm font-mono text-[#58a6ff]">{logs.filter((log) => log.type === "INFO").length}</div>
              </div>
              <div class="space-y-1">
                <div class="text-xs text-[#8b949e]">WARNING</div>
                <div class="text-sm font-mono text-[#d29922]">
                  {logs.filter((log) => log.type === "WARNING").length}
                </div>
              </div>
              <div class="space-y-1">
                <div class="text-xs text-[#8b949e]">ERROR</div>
                <div class="text-sm font-mono text-[#f85149]">
                  {logs.filter((log) => log.type === "ERROR").length}
                </div>
              </div>
              <div class="space-y-1">
                <div class="text-xs text-[#8b949e]">ORDERS</div>
                <div class="text-sm font-mono text-[#8b949e]">
                  {logs.filter((log) => log.type === "ORDER").length}
                </div>
              </div>
            </div>
          </Card.Content>
        </Card.Root>
    </div>
</MainLayout>

