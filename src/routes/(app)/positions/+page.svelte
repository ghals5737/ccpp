<script lang="ts">
	import MainLayout from "../MainLayout.svelte";
    import { RefreshCw, ArrowDown, ArrowUp, X, Info, Filter } from "lucide-svelte"
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Table from "$lib/components/ui/table/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import * as Tabs from "$lib/components/ui/tabs/index.js";

    const positions = [
        {
            id: 1,
            symbol: "BTC/USDT",
            type: "LONG",
            entryPrice: 65432.5,
            currentPrice: 66789.25,
            stopLoss: 64500.0,
            takeProfit: 68000.0,
            pnl: 1356.75,
            pnlPercentage: 2.07,
            size: 0.5,
            time: "2025-05-20 12:34",
            status: "OPEN",
        },
        {
            id: 2,
            symbol: "ETH/USDT",
            type: "SHORT",
            entryPrice: 3456.75,
            currentPrice: 3321.5,
            stopLoss: 3600.0,
            takeProfit: 3200.0,
            pnl: 135.25,
            pnlPercentage: 3.91,
            size: 2.0,
            time: "2025-05-20 13:15",
            status: "OPEN",
        },
        {
            id: 3,
            symbol: "SOL/USDT",
            type: "LONG",
            entryPrice: 145.25,
            currentPrice: 142.75,
            stopLoss: 140.0,
            takeProfit: 155.0,
            pnl: -2.5,
            pnlPercentage: -1.72,
            size: 10.0,
            time: "2025-05-20 11:22",
            status: "CLOSED",
        },
        {
            id: 4,
            symbol: "BTC/USDT",
            type: "SHORT",
            entryPrice: 67000.0,
            currentPrice: 66789.25,
            stopLoss: 68000.0,
            takeProfit: 65000.0,
            pnl: 210.75,
            pnlPercentage: 0.31,
            size: 0.3,
            time: "2025-05-19 16:45",
            status: "CLOSED",
        },
    ]

    let isRefreshing = false
    let lastUpdated = new Date()
    let filter = "all"
    let selectedPosition: any = null
    let selectedTab = "daily"

    const refreshData = () => {
        isRefreshing = true
        // 데이터 새로고침 시뮬레이션
        setTimeout(() => {
        isRefreshing = false
        lastUpdated = new Date()
        }, 800)
    }

    const filteredPositions =
        filter === "all"
        ? positions
        : filter === "open"
            ? positions.filter((p) => p.status === "OPEN")
            : positions.filter((p) => p.status === "CLOSED")
    
</script>

<MainLayout>
    <div class="p-4 space-y-4">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <div class="h-3 w-3 rounded-full bg-[#58a6ff] mr-2"></div>
            <span class="text-sm font-bold">POSITIONS MANAGEMENT</span>
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
            <Card.Title class="text-xs text-[#8b949e]">POSITIONS LIST</Card.Title>
            <div class="flex items-center space-x-2">
              <Select.Root 
                type="single"
                bind:value={filter}
            >
                <Select.Trigger class="w-[120px] h-7 text-xs bg-[#161b22] border-[#30363d]">
                  <Filter class="h-3 w-3 mr-2" />
                  {filter}
                </Select.Trigger>
                <Select.Content class="bg-[#161b22] border-[#30363d] text-xs">
                  <Select.Item value="all" class="text-xs">
                    ALL POSITIONS
                  </Select.Item>
                  <Select.Item value="open" class="text-xs">
                    OPEN POSITIONS
                  </Select.Item>
                  <Select.Item value="closed" class="text-xs">
                    CLOSED POSITIONS
                  </Select.Item>
                </Select.Content>
              </Select.Root>
            </div>
          </Card.Header>
          <Card.Content class="p-0">
            <div class="w-full overflow-auto terminal-scrollbar">
              <Table.Root>
                <Table.Header>
                  <Table.Row class="terminal-table-header">
                    <Table.Head class="font-mono">SYMBOL</Table.Head>
                    <Table.Head class="font-mono">TYPE</Table.Head>
                    <Table.Head class="font-mono">ENTRY</Table.Head>
                    <Table.Head class="font-mono">SL</Table.Head>
                    <Table.Head class="font-mono">TP</Table.Head>
                    <Table.Head class="font-mono">SIZE</Table.Head>
                    <Table.Head class="font-mono">TIME</Table.Head>
                    <Table.Head class="font-mono">STATUS</Table.Head>
                    <Table.Head class="font-mono">P&L</Table.Head>
                    <Table.Head class="text-right font-mono">ACTIONS</Table.Head>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {#each filteredPositions as position}
                    <Table.Row class="terminal-table-row">
                      <Table.Cell class="font-mono text-xs py-1">{position.symbol}</Table.Cell>
                      <Table.Cell class="py-1">
                        <span
                          class={`text-xs px-1 py-0.5 font-mono ${
                            position.type === "LONG" ? "bg-[#1e3a2f] text-[#3fb950]" : "bg-[#2d1213] text-[#f85149]"
                          }`}
                        >
                          {#if position.type === "LONG"}
                            <ArrowUp class="h-3 w-3 inline mr-1" />
                          {:else}
                            <ArrowDown class="h-3 w-3 inline mr-1" />
                          {/if}
                          {position.type}
                        </span>
                      </Table.Cell>
                      <Table.Cell class="font-mono text-xs py-1">${position.entryPrice.toFixed(2)}</Table.Cell>
                      <Table.Cell class="font-mono text-xs py-1">${position.stopLoss.toFixed(2)}</Table.Cell>
                      <Table.Cell class="font-mono text-xs py-1">${position.takeProfit.toFixed(2)}</Table.Cell>
                      <Table.Cell class="font-mono text-xs py-1">{position.size}</Table.Cell>
                      <Table.Cell class="font-mono text-xs py-1">{position.time}</Table.Cell>
                      <Table.Cell class="py-1">
                        <span
                          class={`text-xs px-1 py-0.5 font-mono ${
                            position.status === "OPEN" ? "bg-[#1e3a2f] text-[#3fb950]" : "bg-[#30363d] text-[#8b949e]"
                          }`}
                        >
                          {position.status}
                        </span>
                      </Table.Cell>
                      <Table.Cell
                        class={`font-mono text-xs py-1 ${position.pnl >= 0 ? "text-[#3fb950]" : "text-[#f85149]"}`}
                      >
                        ${position.pnl.toFixed(2)} ({position.pnlPercentage.toFixed(2)}%)
                      </Table.Cell>
                      <Table.Cell class="text-right py-1">
                        <div class="flex items-center justify-end space-x-1">
                          <Dialog.Root>
                            <Dialog.Trigger >
                              <Button
                                variant="outline"
                                size="sm"
                                class="h-6 text-xs bg-[#161b22] border-[#30363d] hover:bg-[#1f2937]"
                                onclick={() => selectedPosition = position}
                              >
                                <Info class="h-3 w-3" />
                              </Button>
                            </Dialog.Trigger>
                            <Dialog.Content class="bg-[#161b22] border-[#30363d] text-[#e6edf3]">
                              <Dialog.Header>
                                <Dialog.Title class="text-[#e6edf3]">Position Details</Dialog.Title>
                              </Dialog.Header>
                              {#if selectedPosition}
                                <div class="space-y-4">
                                  <div class="grid grid-cols-2 gap-4">
                                    <div>
                                      <p class="text-xs text-[#8b949e]">Symbol</p>
                                      <p class="text-sm">{selectedPosition.symbol}</p>
                                    </div>
                                    <div>
                                      <p class="text-xs text-[#8b949e]">Type</p>
                                      <p
                                        class={`text-sm ${selectedPosition.type === "LONG" ? "text-[#3fb950]" : "text-[#f85149]"}`}
                                      >
                                        {selectedPosition.type}
                                      </p>
                                    </div>
                                    <div>
                                      <p class="text-xs text-[#8b949e]">Entry Price</p>
                                      <p class="text-sm">${selectedPosition.entryPrice.toFixed(2)}</p>
                                    </div>
                                    <div>
                                      <p class="text-xs text-[#8b949e]">Current Price</p>
                                      <p class="text-sm">${selectedPosition.currentPrice.toFixed(2)}</p>
                                    </div>
                                    <div>
                                      <p class="text-xs text-[#8b949e]">Stop Loss</p>
                                      <p class="text-sm">${selectedPosition.stopLoss.toFixed(2)}</p>
                                    </div>
                                    <div>
                                      <p class="text-xs text-[#8b949e]">Take Profit</p>
                                      <p class="text-sm">${selectedPosition.takeProfit.toFixed(2)}</p>
                                    </div>
                                    <div>
                                      <p class="text-xs text-[#8b949e]">Size</p>
                                      <p class="text-sm">{selectedPosition.size}</p>
                                    </div>
                                    <div>
                                      <p class="text-xs text-[#8b949e]">Entry Time</p>
                                      <p class="text-sm">{selectedPosition.time}</p>
                                    </div>
                                    <div>
                                      <p class="text-xs text-[#8b949e]">Status</p>
                                      <p
                                        class={`text-sm ${selectedPosition.status === "OPEN" ? "text-[#3fb950]" : "text-[#8b949e]"}`}
                                      >
                                        {selectedPosition.status}
                                      </p>
                                    </div>
                                    <div>
                                      <p class="text-xs text-[#8b949e]">P&L</p>
                                      <p
                                        class={`text-sm ${selectedPosition.pnl >= 0 ? "text-[#3fb950]" : "text-[#f85149]"}`}
                                      >
                                        ${selectedPosition.pnl.toFixed(2)} ({selectedPosition.pnlPercentage.toFixed(2)}%)
                                      </p>
                                    </div>
                                  </div>
                                  {#if selectedPosition.status === "OPEN"}
                                    <div class="flex justify-end">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        class="h-7 text-xs bg-[#2d1213] text-[#f85149] border-[#f85149] hover:bg-[#3d1a1b]"
                                      >
                                        <X class="h-3 w-3 mr-1" />
                                        CLOSE POSITION
                                      </Button>
                                    </div>
                                  {/if}
                                </div>
                              {/if}
                            </Dialog.Content>
                          </Dialog.Root>
                          {#if position.status === "OPEN"}
                            <Button
                              variant="outline"
                              size="sm"
                              class="h-6 text-xs bg-[#2d1213] text-[#f85149] border-[#f85149] hover:bg-[#3d1a1b]"
                            >
                              <X class="h-3 w-3 mr-1" />
                              CLOSE
                            </Button>
                          {/if}
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  {/each}
                </Table.Body>
              </Table.Root>
            </div>
          </Card.Content>
        </Card.Root>
  
        <Card.Root class="terminal-section">
          <Card.Header class="py-2 px-3 border-b border-[#30363d]">
            <Card.Title class="text-xs text-[#8b949e]">PERFORMANCE SUMMARY</Card.Title>
          </Card.Header>
          <Card.Content class="p-3">
            <Tabs.Root 
                value={selectedTab}
            >
              <Tabs.List class="w-full grid grid-cols-3 bg-[#161b22] p-0 h-auto">
                {#each ["daily", "weekly", "monthly"] as tab}
                  <Tabs.Trigger
                    value={tab}
                    class="text-xs py-1.5 rounded-none data-[state=active]:bg-[#0d1117] data-[state=active]:text-[#e6edf3] data-[state=inactive]:text-[#8b949e] data-[state=inactive]:bg-[#161b22]"
                  >
                    {tab.toUpperCase()}
                  </Tabs.Trigger>
                {/each}
              </Tabs.List>
  
              <Tabs.Content value="daily" class="mt-4">
                <div class="grid grid-cols-4 gap-4">
                  <div class="space-y-1">
                    <div class="text-xs text-[#8b949e]">TOTAL TRADES</div>
                    <div class="text-sm font-mono">5</div>
                  </div>
                  <div class="space-y-1">
                    <div class="text-xs text-[#8b949e]">WIN RATE</div>
                    <div class="text-sm font-mono text-[#3fb950]">60%</div>
                  </div>
                  <div class="space-y-1">
                    <div class="text-xs text-[#8b949e]">PROFIT</div>
                    <div class="text-sm font-mono text-[#f85149]">-$521.35</div>
                  </div>
                  <div class="space-y-1">
                    <div class="text-xs text-[#8b949e]">BEST TRADE</div>
                    <div class="text-sm font-mono text-[#3fb950]">+$1,356.75</div>
                  </div>
                </div>
              </Tabs.Content>
  
              <Tabs.Content value="weekly" class="mt-4">
                <div class="grid grid-cols-4 gap-4">
                  <div class="space-y-1">
                    <div class="text-xs text-[#8b949e]">TOTAL TRADES</div>
                    <div class="text-sm font-mono">23</div>
                  </div>
                  <div class="space-y-1">
                    <div class="text-xs text-[#8b949e]">WIN RATE</div>
                    <div class="text-sm font-mono text-[#3fb950]">65%</div>
                  </div>
                  <div class="space-y-1">
                    <div class="text-xs text-[#8b949e]">PROFIT</div>
                    <div class="text-sm font-mono text-[#3fb950]">+$2,345.67</div>
                  </div>
                  <div class="space-y-1">
                    <div class="text-xs text-[#8b949e]">BEST TRADE</div>
                    <div class="text-sm font-mono text-[#3fb950]">+$1,987.50</div>
                  </div>
                </div>
              </Tabs.Content>
  
              <Tabs.Content value="monthly" class="mt-4">
                <div class="grid grid-cols-4 gap-4">
                  <div class="space-y-1">
                    <div class="text-xs text-[#8b949e]">TOTAL TRADES</div>
                    <div class="text-sm font-mono">87</div>
                  </div>
                  <div class="space-y-1">
                    <div class="text-xs text-[#8b949e]">WIN RATE</div>
                    <div class="text-sm font-mono text-[#3fb950]">68%</div>
                  </div>
                  <div class="space-y-1">
                    <div class="text-xs text-[#8b949e]">PROFIT</div>
                    <div class="text-sm font-mono text-[#3fb950]">+$8,765.43</div>
                  </div>
                  <div class="space-y-1">
                    <div class="text-xs text-[#8b949e]">BEST TRADE</div>
                    <div class="text-sm font-mono text-[#3fb950]">+$3,456.78</div>
                  </div>
                </div>
              </Tabs.Content>
            </Tabs.Root>
          </Card.Content>
        </Card.Root>
      </div>
</MainLayout>