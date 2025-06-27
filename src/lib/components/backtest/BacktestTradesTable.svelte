<script lang="ts">
    import { ArrowDown, ArrowUp } from "lucide-svelte"
    import * as Table from "$lib/components/ui/table/index.js";

    const trades = [
        {
            id: 1,
            date: "2023-01-02 14:32:45",
            symbol: "BTC/USDT",
            type: "LONG",
            entryPrice: 65432.5,
            exitPrice: 66789.25,
            pnl: 1356.75,
            pnlPercentage: 2.07,
            fee: 12.5,
        },
        {
            id: 2,
            date: "2023-01-03 10:15:22",
            symbol: "ETH/USDT",
            type: "SHORT",
            entryPrice: 3456.75,
            exitPrice: 3321.5,
            pnl: 135.25,
            pnlPercentage: 3.91,
            fee: 5.25,
        },
        {
            id: 3,
            date: "2023-01-04 09:45:18",
            symbol: "SOL/USDT",
            type: "LONG",
            entryPrice: 145.25,
            exitPrice: 142.75,
            pnl: -2.5,
            pnlPercentage: -1.72,
            fee: 0.75,
        },
        {
            id: 4,
            date: "2023-01-05 16:22:33",
            symbol: "BTC/USDT",
            type: "SHORT",
            entryPrice: 66789.25,
            exitPrice: 65432.5,
            pnl: 1356.75,
            pnlPercentage: 2.03,
            fee: 12.5,
        },
        {
            id: 5,
            date: "2023-01-06 11:05:42",
            symbol: "ETH/USDT",
            type: "LONG",
            entryPrice: 3321.5,
            exitPrice: 3456.75,
            pnl: 135.25,
            pnlPercentage: 4.07,
            fee: 5.25,
        },
    ]
</script>

<div class="w-full overflow-auto terminal-scrollbar">
    <Table.Root>
      <Table.Header>
        <Table.Row class="terminal-table-header">
          <Table.Head class="font-mono">TIMESTAMP</Table.Head>
          <Table.Head class="font-mono">SYMBOL</Table.Head>
          <Table.Head class="font-mono">TYPE</Table.Head>
          <Table.Head class="font-mono">ENTRY</Table.Head>
          <Table.Head class="font-mono">EXIT</Table.Head>
          <Table.Head class="font-mono">P&L</Table.Head>
          <Table.Head class="font-mono">FEE</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each trades as trade}
          <Table.Row class="terminal-table-row">
            <Table.Cell class="font-mono text-xs py-1">{trade.date}</Table.Cell>
            <Table.Cell class="font-mono text-xs py-1">{trade.symbol}</Table.Cell>
            <Table.Cell class="py-1">
              <span
                class={`text-xs px-1 py-0.5 font-mono ${
                  trade.type === "LONG" ? "bg-[#1e3a2f] text-[#3fb950]" : "bg-[#2d1213] text-[#f85149]"
                }`}
              >
                {#if trade.type === "LONG"}
                  <ArrowUp class="h-3 w-3 inline mr-1" />
                {:else}
                  <ArrowDown class="h-3 w-3 inline mr-1" />
                {/if}
                {trade.type}
              </span>
            </Table.Cell>
            <Table.Cell class="font-mono text-xs py-1">${trade.entryPrice.toFixed(2)}</Table.Cell>
            <Table.Cell class="font-mono text-xs py-1">${trade.exitPrice.toFixed(2)}</Table.Cell>
            <Table.Cell class={`font-mono text-xs py-1 ${trade.pnl >= 0 ? "text-[#3fb950]" : "text-[#f85149]"}`}>
              ${trade.pnl.toFixed(2)} ({trade.pnlPercentage.toFixed(2)}%)
            </Table.Cell>
            <Table.Cell class="font-mono text-xs py-1">${trade.fee.toFixed(2)}</Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
</div>