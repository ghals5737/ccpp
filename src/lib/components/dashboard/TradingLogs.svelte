<script lang="ts">
    import { Filter, ArrowUp, ArrowDown } from 'lucide-svelte';
    import ScrollArea from '$lib/components/ui/scroll-area/ScrollArea.svelte';
    import Select from '$lib/components/ui/select/Select.svelte';
    import SelectTrigger from '$lib/components/ui/select/SelectTrigger.svelte';
    import SelectContent from '$lib/components/ui/select/SelectContent.svelte';
    import SelectItem from '$lib/components/ui/select/SelectItem.svelte';
    import SelectValue from '$lib/components/ui/select/SelectValue.svelte';
    import Badge from '$lib/components/ui/badge/Badge.svelte';
    import Button from '$lib/components/ui/button/Button.svelte';

    const logs = [
  {
    id: 1,
    time: "14:32:45",
    type: "BUY",
    symbol: "BTC/USDT",
    price: 66789.25,
    amount: 0.05,
    pnl: null,
  },
  {
    id: 2,
    time: "14:30:12",
    type: "SELL",
    symbol: "ETH/USDT",
    price: 3321.5,
    amount: 0.5,
    pnl: 135.25,
  },
  {
    id: 3,
    time: "14:15:33",
    type: "BUY",
    symbol: "SOL/USDT",
    price: 142.75,
    amount: 2.0,
    pnl: null,
  },
  {
    id: 4,
    time: "13:55:21",
    type: "SELL",
    symbol: "BTC/USDT",
    price: 66432.5,
    amount: 0.02,
    pnl: -12.5,
  },
  {
    id: 5,
    time: "13:42:18",
    type: "BUY",
    symbol: "ETH/USDT",
    price: 3345.25,
    amount: 0.3,
    pnl: null,
  },
  {
    id: 6,
    time: "13:30:05",
    type: "SELL",
    symbol: "SOL/USDT",
    price: 144.5,
    amount: 5.0,
    pnl: 23.75,
  },
  {
    id: 7,
    time: "13:15:42",
    type: "BUY",
    symbol: "BTC/USDT",
    price: 66321.75,
    amount: 0.01,
    pnl: null,
  },
    ]
    let filter = "all"

    const filteredLogs = filter === "all" ? logs : logs.filter((log) => log.type === filter.toUpperCase())
</script>

<div class="space-y-4">
<div class="flex items-center justify-between">
    <Select value={filter}>
    <SelectTrigger class="w-[180px] retro-button font-bold">
        <Filter class="h-4 w-4 mr-2" />
        <SelectValue placeholder="Filter logs" />
    </SelectTrigger>
    <SelectContent class="retro-box-sm">
        <SelectItem value="all" class="font-bold">
        ALL LOGS
        </SelectItem>
        <SelectItem value="buy" class="font-bold">
        BUY ORDERS
        </SelectItem>
        <SelectItem value="sell" class="font-bold">
        SELL ORDERS
        </SelectItem>
    </SelectContent>
    </Select>
    <Button variant="outline" size="sm" class="retro-button font-bold">
    CLEAR
    </Button>
</div>
<ScrollArea className="h-[300px] rounded-md retro-inset p-4">
    <div class="space-y-4">
    {#each filteredLogs as log}
        <div class="flex items-center justify-between text-sm border-b border-black/20 pb-2">
        <div class="flex items-center gap-2">
            <span class="text-muted-foreground font-mono">{log.time}</span>
            <Badge
            variant="outline"
            class={
                log.type === "BUY"
                ? "bg-green-500/10 text-green-700 border-2 border-green-700 font-bold"
                : "bg-red-500/10 text-red-700 border-2 border-red-700 font-bold"
            }
            >
            {#if log.type === "BUY"}
                <ArrowUp class="h-3 w-3 mr-1" />
            {:else}
                <ArrowDown class="h-3 w-3 mr-1" />
            {/if}
            {log.type}
            </Badge>
            <span class="font-bold">{log.symbol}</span>
        </div>
        <div class="flex items-center gap-4 font-mono">
            <span>${log.price.toFixed(2)}</span>
            <span>{log.amount}</span>
            {#if log.pnl !== null}
            <span class={log.pnl >= 0 ? "text-green-700 font-bold" : "text-red-700 font-bold"}>
                ${log.pnl.toFixed(2)}
            </span>
            {/if}
        </div>
        </div>
    {/each}
    </div>
</ScrollArea>
</div>
