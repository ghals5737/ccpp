<script lang="ts">
    import { ArrowDown, ArrowUp, X } from "lucide-svelte"
    import * as Table from "$lib/components/ui/table/index.js";
    import { Button } from "$lib/components/ui/button/index.js";

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
    },
    ]
</script>

<div class="w-full overflow-auto terminal-scrollbar">
    <Table.Root>
      <Table.Header>
        <Table.Row class="terminal-table-header">
          <Table.Head class="font-mono text-[#8b949e]">SYMBOL</Table.Head>
          <Table.Head class="font-mono text-[#8b949e]">POS</Table.Head>
          <Table.Head class="font-mono text-[#8b949e]">ENTRY</Table.Head>
          <Table.Head class="font-mono text-[#8b949e]">CURRENT</Table.Head>
          <Table.Head class="font-mono text-[#8b949e]">SL</Table.Head>
          <Table.Head class="font-mono text-[#8b949e]">TP</Table.Head>
          <Table.Head class="font-mono text-[#8b949e]">P&L</Table.Head>
          <Table.Head class="font-mono text-[#8b949e]">SIZE</Table.Head>
          <Table.Head class="text-right font-mono text-[#8b949e]">ACTION</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each positions as position}
          <Table.Row class="terminal-table-row">
            <Table.Cell class="font-mono text-xs py-1 text-white">{position.symbol}</Table.Cell>
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
            <Table.Cell class="font-mono text-xs py-1 text-white">${position.entryPrice.toFixed(2)}</Table.Cell>
            <Table.Cell class="font-mono text-xs py-1 text-white">${position.currentPrice.toFixed(2)}</Table.Cell>
            <Table.Cell class="font-mono text-xs py-1 text-white">${position.stopLoss.toFixed(2)}</Table.Cell>
            <Table.Cell class="font-mono text-xs py-1 text-white">${position.takeProfit.toFixed(2)}</Table.Cell>
            <Table.Cell
              class={`font-mono text-xs py-1 ${position.pnl >= 0 ? "text-[#3fb950]" : "text-[#f85149]"}`}
            >
              ${position.pnl.toFixed(2)} ({position.pnlPercentage.toFixed(2)}%)
            </Table.Cell>
            <Table.Cell class="font-mono text-xs py-1 text-white">{position.size}</Table.Cell>
            <Table.Cell class="text-right py-1">
              <Button
                variant="outline"
                size="sm"
                class="h-6 text-xs bg-[#2d1213] text-[#f85149] border-[#f85149] hover:bg-[#3d1a1b] rounded-none"
              >
                <X class="h-3 w-3 mr-1" />
                CLOSE
              </Button>
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>