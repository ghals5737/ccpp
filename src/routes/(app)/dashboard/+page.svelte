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
    import { AlertCircle, ArrowUp, Clock, Play, Square, Trash2 } from "lucide-svelte";
    import PositionsTable from "$lib/components/dashboard/PositionsTable.svelte";
    import TradingLogs from "$lib/components/dashboard/TradingLogs.svelte";
    import TradingChart from "$lib/components/dashboard/TradingChart.svelte";


    let botRunning = true
    let showAlert = true

    const toggleBotStatus = () => {
        botRunning = !botRunning
    }

    const currentTime = new Date().toLocaleTimeString()
    const currentDate = new Date().toLocaleDateString()
</script>
<div class="flex flex-col gap-6">
<h1 class="text-3xl font-bold font-grotesk tracking-wider uppercase">Dashboard</h1>

<div class="grid gap-6 md:grid-cols-3">
    <Card class="retro-box bg-cream">
    <CardHeader class="pb-2">
        <CardDescription class="text-xs uppercase font-bold">Bot Status</CardDescription>
        <div class="flex items-center justify-between">
        <CardTitle class="text-2xl font-bold">{botRunning ? "RUNNING" : "STOPPED"}</CardTitle>
        <Button
            variant={botRunning ? "destructive" : "default"}
            size="sm"
            on:click={toggleBotStatus}
            class="h-8 retro-button font-bold"
        >
            {#if botRunning}
                <Square class="h-4 w-4 mr-1" />
            {:else}
                <Play class="h-4 w-4 mr-1" />
            {/if}
            {botRunning ? "STOP" : "START"}
        </Button>
        </div>
    </CardHeader>
    </Card>
    <Card class="retro-box bg-cream">
    <CardHeader class="pb-2">
        <CardDescription class="text-xs uppercase font-bold">Daily P&L</CardDescription>
        <div class="flex items-center">
        <CardTitle class="text-2xl font-bold text-orange">+$1,234.56</CardTitle>
        <Badge variant="outline" class="ml-2 bg-orange/10 text-orange border-2 border-black">
            <ArrowUp class="h-3 w-3 mr-1" />
            8.2%
        </Badge>
        </div>
    </CardHeader>
    </Card>
    <Card class="retro-box bg-cream">
    <CardHeader class="pb-2">
        <CardDescription class="text-xs uppercase font-bold">Current Time</CardDescription>
        <div class="flex items-center">
        <CardTitle class="text-2xl font-bold">{currentTime}</CardTitle>
        <Clock class="ml-2 h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription class="font-mono">{currentDate}</CardDescription>
    </CardHeader>
    </Card>
</div>

{#if showAlert}
    <Alert variant="destructive" class="mb-4 retro-box bg-destructive/20 border-destructive">
    <AlertCircle class="h-4 w-4" />
    <AlertTitle class="font-bold">ERROR</AlertTitle>
    <AlertDescription class="flex items-center justify-between">
        <span>API connection failed. Please check your API keys in settings.</span>
        <Button variant="ghost" size="sm" on:click={() => showAlert = false}>
        <Trash2 class="h-4 w-4" />
        </Button>
    </AlertDescription>
    </Alert>
{/if}

<div class="grid gap-6 md:grid-cols-2">
    <Card class="md:col-span-1 retro-box bg-cream">
    <CardHeader class="border-b-2 border-black">
        <CardTitle class="text-xl font-bold font-grotesk uppercase">Positions</CardTitle>
    </CardHeader>
    <CardContent class="p-0">
        <PositionsTable />
    </CardContent>
    </Card>
    <Card class="md:col-span-1 retro-box bg-cream">
    <CardHeader class="border-b-2 border-black">
        <CardTitle class="text-xl font-bold font-grotesk uppercase">Trading Logs</CardTitle>
    </CardHeader>
    <CardContent class="p-4">
        <TradingLogs />
    </CardContent>
    </Card>
</div>

<Card class="col-span-2 retro-box bg-cream">
    <CardHeader class="border-b-2 border-black">
    <CardTitle class="text-xl font-bold font-grotesk uppercase">BTC/USDT Chart</CardTitle>
    </CardHeader>
    <CardContent class="p-4">
    <TradingChart />
    </CardContent>
</Card>
</div>