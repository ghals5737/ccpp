<script lang="ts">
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";

    const recentLogs = [
        {
            id: 1,
            time: "14:32:45",
            type: "ORDER",
            message: "LONG BTC/USDT @ $66,789.25",
            status: "success",
        },
        {
            id: 2,
            time: "14:30:12",
            type: "SIGNAL",
            message: "BUY signal detected",
            status: "info",
        },
        {
            id: 3,
            time: "14:28:33",
            type: "WARNING",
            message: "High volatility detected",
            status: "warning",
        },
        {
            id: 4,
            time: "14:25:18",
            type: "ORDER",
            message: "SHORT ETH/USDT closed +$135.25",
            status: "success",
        },
        {
            id: 5,
            time: "14:22:05",
            type: "ERROR",
            message: "API rate limit reached",
            status: "error",
        },        
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
        case "success":
            return "text-[#02c076]"
        case "warning":
            return "text-[#fcd535]"
        case "error":
            return "text-[#f6465d]"
        default:
            return "text-[#848e9c]"
        }
    }

    const getTypeColor = (type: string) => {
        switch (type) {
        case "ORDER":
            return "text-[#02c076]"
        case "SIGNAL":
            return "text-[#fcd535]"
        case "WARNING":
            return "text-[#fcd535]"
        case "ERROR":
            return "text-[#f6465d]"
        default:
            return "text-[#848e9c]"
        }
    }

</script>

<ScrollArea class="h-[200px] md:h-[250px]">
    <div class="p-4 space-y-3">
      {#each recentLogs as log}
        <div class="flex items-start gap-3 text-xs">
          <span class="text-[#848e9c] font-mono min-w-[60px]">{log.time}</span>
          <span class={`font-semibold min-w-[60px] ${getTypeColor(log.type)}`}>[{log.type}]</span>
          <span class={`flex-1 ${getStatusColor(log.status)}`}>{log.message}</span>
        </div>
      {/each}
    </div>
</ScrollArea>