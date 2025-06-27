<script lang="ts">
    import { CalendarIcon, Play, RefreshCw } from "lucide-svelte"
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { format } from "date-fns";    
    import Calendar from "$lib/components/ui/calendar/calendar.svelte";
    import { CalendarDate } from "@internationalized/date";
    import BacktestResults from "$lib/components/backtest/BacktestResults.svelte";
    import BacktestChart from "$lib/components/backtest/BacktestChart.svelte";
    import BacktestTradesTable from "$lib/components/backtest/BacktestTradesTable.svelte";
	import MainLayout from "../MainLayout.svelte";

    let value = $state<CalendarDate>(new CalendarDate(2025, 6, 12));
    let vvalue = $state<CalendarDate>(new CalendarDate(2025, 6, 12));
    let startDate = new Date()
    let endDate = new Date()
    let initialCapital = "10000"
    let isRunning = false
    let hasResults= false
    let lastUpdated = new Date()
    let isRefreshing = false
    

    const refreshData = () => {
        isRefreshing = true

        setTimeout(() => {
        isRefreshing = false
        lastUpdated = new Date()
        }, 800)
    }

    const runBacktest = () => {
        isRunning = true

        setTimeout(() => {
            isRunning = false
            hasResults = true
        }, 2000)
    }
     

</script>

<MainLayout>
<div class="p-4 space-y-4">
    <div class="flex items-center justify-between mb-4">
        <div class="flex items-center">
        <div class="h-3 w-3 rounded-full bg-[#58a6ff] mr-2"></div>
        <span class="text-sm font-bold">BACKTEST ANALYSIS</span>
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
        <Card.Header class="py-2 px-3 border-b border-[#30363d]">
        <Card.Title class="text-xs text-[#8b949e]">BACKTEST PARAMETERS</Card.Title>
        </Card.Header>
        <Card.Content class="p-3">
        <div class="grid gap-4 md:grid-cols-4">
            <div class="space-y-2">
            <Label for="start-date" class="text-xs">
                START DATE
            </Label>
            <Popover.Root>
                <Popover.Trigger>
                <Button
                    id="start-date"
                    variant={"outline"}
                    class={`w-full justify-start text-left text-xs h-7 bg-[#161b22] border-[#30363d] ${!startDate ? "text-[#8b949e]" : ""}`}
                >
                    <CalendarIcon class="mr-2 h-3 w-3" />
                    {#if startDate}
                        {format(startDate, "yyyy-MM-dd")}
                    {:else}
                        <span>Select date</span>
                    {/if}
                </Button>
                </Popover.Trigger>
                <Popover.Content class="p-0 bg-[#161b22] border-[#30363d]">
                <Calendar
                    type="single"
                    bind:value={value}
                    initialFocus
                    class="bg-[#161b22]"
                />
                </Popover.Content>
            </Popover.Root>
            </div>
            <div class="space-y-2">
            <Label for="end-date" class="text-xs">
                END DATE
            </Label>
            <Popover.Root>
                <Popover.Trigger>
                <Button
                    id="end-date"
                    variant={"outline"}
                    class={`w-full justify-start text-left text-xs h-7 bg-[#161b22] border-[#30363d] ${!endDate ? "text-[#8b949e]" : ""}`}
                >
                    <CalendarIcon class="mr-2 h-3 w-3" />
                    {#if endDate}
                        {format(endDate, "yyyy-MM-dd")}
                    {:else}
                        <span>Select date</span>
                    {/if}
                </Button>
                </Popover.Trigger>
                <Popover.Content class="p-0 bg-[#161b22] border-[#30363d]">
                <Calendar
                    type="single"
                    bind:value={vvalue}
                    initialFocus
                    class="bg-[#161b22]"
                />
                </Popover.Content>
            </Popover.Root>
            </div>
            <div class="space-y-2">
            <Label for="initial-capital" class="text-xs">
                INITIAL CAPITAL (USDT)
            </Label>
            <Input
                id="initial-capital"
                bind:value={initialCapital}
                type="number"
                min="0"
                class="h-7 text-xs bg-[#161b22] border-[#30363d]"
            />
            </div>
            <div class="flex items-end">
            <Button
                class="w-full h-7 text-xs bg-[#1e3a2f] text-[#3fb950] border border-[#3fb950] hover:bg-[#2a4f3e]"
                onclick={runBacktest}
                disabled={isRunning}
            >
                {#if isRunning}
                    <span>RUNNING...</span>
                {:else}
                    <span>RUN BACKTEST</span>
                {/if}
                {#if !isRunning}
                    <Play class="ml-2 h-3 w-3" />
                {/if}
            </Button>
            </div>
        </div>
        </Card.Content>
    </Card.Root>

    {#if hasResults}
        <div>
        <BacktestResults />

        <Card.Root class="terminal-section">
            <Card.Header class="py-2 px-3 border-b border-[#30363d]">
            <Card.Title class="text-xs text-[#8b949e]">PERFORMANCE CHART</Card.Title>
            </Card.Header>
            <Card.Content class="p-0">
            <BacktestChart />
            </Card.Content>
        </Card.Root>

        <Card.Root class="terminal-section">
            <Card.Header class="py-2 px-3 border-b border-[#30363d]">
            <Card.Title class="text-xs text-[#8b949e]">TRANSACTION HISTORY</Card.Title>
            </Card.Header>
            <Card.Content class="p-0">
            <BacktestTradesTable />
            </Card.Content>
        </Card.Root>
        </div>
    {/if}
</div>
</MainLayout>