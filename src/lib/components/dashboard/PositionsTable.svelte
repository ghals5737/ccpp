<script lang="ts">
    import { ArrowDown, ArrowUp, X } from "lucide-svelte";
    import Badge from "$lib/components/ui/badge/Badge.svelte";
    import Button from "$lib/components/ui/button/Button.svelte";
    import Table from "$lib/components/ui/table/Table.svelte";
    import TableHeader from "$lib/components/ui/table/TableHeader.svelte";
    import TableBody from "$lib/components/ui/table/TableBody.svelte";
    import TableRow from "$lib/components/ui/table/TableRow.svelte";
    import TableCell from "$lib/components/ui/table/TableCell.svelte";
    
    const positions = [
        {
            id: 1,
            symbol: "BTC/USDT",
            type: "LONG",
            entryPrice: 65432.5,
            currentPrice: 66789.25,
            pnl: 1356.75,
            pnlPercentage: 2.07,
            size: 0.5,
        },
        {
            id: 2,
            symbol: "ETH/USDT",
            type: "SHORT",
            entryPrice: 3456.75,
            currentPrice: 3321.5,
            pnl: 135.25,
            pnlPercentage: 3.91,
            size: 2.0,
        },
        {
            id: 3,
            symbol: "SOL/USDT",
            type: "LONG",
            entryPrice: 145.25,
            currentPrice: 142.75,
            pnl: -2.5,
            pnlPercentage: -1.72,
            size: 10.0,
        },
        ]
</script>
<div class="w-full overflow-auto">
    <Table>
      <TableHeader className="bg-navy text-cream">
        <TableRow>
          <TableHeader className="font-bold">SYMBOL</TableHeader>
          <TableHeader className="font-bold">POSITION</TableHeader>
          <TableHeader className="font-bold">ENTRY</TableHeader>
          <TableHeader className="font-bold">CURRENT</TableHeader>
          <TableHeader className="font-bold">P&L</TableHeader>
          <TableHeader className="font-bold">SIZE</TableHeader>
          <TableHeader className="text-right font-bold">ACTION</TableHeader>
        </TableRow>
      </TableHeader>
      <TableBody>
        {#each positions as position}
          <TableRow className="border-b border-black">
            <TableCell className="font-bold">{position.symbol}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                class={
                  position.type === "LONG"
                    ? "bg-green-500/10 text-green-700 border-2 border-green-700 font-bold"
                    : "bg-red-500/10 text-red-700 border-2 border-red-700 font-bold"
                }
              >
                {#if position.type === "LONG"}
                  <ArrowUp class="h-3 w-3 mr-1" />
                {:else}
                  <ArrowDown class="h-3 w-3 mr-1" />
                {/if}
                {position.type}
              </Badge>
            </TableCell>
            <TableCell className="font-mono">${position.entryPrice.toFixed(2)}</TableCell>
            <TableCell className="font-mono">${position.currentPrice.toFixed(2)}</TableCell>
            <TableCell
              className={
                position.pnl >= 0 ? "text-green-700 font-mono font-bold" : "text-red-700 font-mono font-bold"
              }
            >
              ${position.pnl.toFixed(2)} ({position.pnlPercentage.toFixed(2)}%)
            </TableCell>
            <TableCell className="font-mono">{position.size}</TableCell>
            <TableCell className="text-right">
              <Button variant="destructive" size="sm" className="retro-button font-bold">
                <X class="h-4 w-4 mr-1" />
                CLOSE
              </Button>
            </TableCell>
          </TableRow>
        {/each}
      </TableBody>
    </Table>
  </div>