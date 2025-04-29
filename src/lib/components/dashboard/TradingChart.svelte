<script lang="ts">
    import { onMount } from 'svelte';
    import { Chart, registerables } from 'chart.js';
    import { Line } from 'chart.js/auto';
    import { onDestroy } from 'svelte';
    import Tabs from "$lib/components/ui/tabs/Tabs.svelte"
    import TabsList from "$lib/components/ui/tabs/TabsList.svelte"
    import TabsTrigger from "$lib/components/ui/tabs/TabsTrigger.svelte"
    import Switch from "$lib/components/ui/switch/Switch.svelte"
    import Label from "$lib/components/ui/label/Label.svelte"

    Chart.register(...registerables);

    const data = [
        { time: "00:00", price: 65432 },
        { time: "04:00", price: 65789 },
        { time: "08:00", price: 66123 },
        { time: "12:00", price: 65987 },
        { time: "16:00", price: 66543 },
        { time: "20:00", price: 66789 },
        { time: "00:00", price: 67012 },
        { time: "04:00", price: 66897 },
        { time: "08:00", price: 67234 },
        { time: "12:00", price: 67432 },
        { time: "16:00", price: 67123 },
        { time: "20:00", price: 66987 },
        { time: "00:00", price: 67345 },
    ]

    let timeframe = "1h"
    let showIndicators = true
    let showSignals = true

    let chart;
    let chartRef;

    onMount(() => {
        const ctx = chartRef.getContext('2d');
        
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.time),
                datasets: [{
                    label: '가격',
                    data: data.map(d => d.price),
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    });

    onDestroy(() => {
        if (chart) {
            chart.destroy();
        }
    });

    $: if (chart && data) {
        chart.data.labels = data.map(d => d.time);
        chart.data.datasets[0].data = data.map(d => d.price);
        chart.update();
    }

    function setTimeframe(value: string) {
        timeframe = value
    }

    function setShowIndicators(event: CustomEvent<{ checked: boolean }>) {
        showIndicators = event.detail.checked
    }

    function setShowSignals(event: CustomEvent<{ checked: boolean }>) {
        showSignals = event.detail.checked
    }
</script>

<div class="space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-4">
        <Tabs value={timeframe} class="w-auto" on:valueChange={({ detail }) => setTimeframe(detail)}>
            <TabsList class="retro-box bg-cream">
                <TabsTrigger value="1m" class="data-[state=active]:bg-orange data-[state=active]:text-black font-bold">
                    1M
                </TabsTrigger>
                <TabsTrigger value="5m" class="data-[state=active]:bg-orange data-[state=active]:text-black font-bold">
                    5M
                </TabsTrigger>
                <TabsTrigger value="15m" class="data-[state=active]:bg-orange data-[state=active]:text-black font-bold">
                    15M
                </TabsTrigger>
                <TabsTrigger value="1h" class="data-[state=active]:bg-orange data-[state=active]:text-black font-bold">
                    1H
                </TabsTrigger>
                <TabsTrigger value="4h" class="data-[state=active]:bg-orange data-[state=active]:text-black font-bold">
                    4H
                </TabsTrigger>
                <TabsTrigger value="1d" class="data-[state=active]:bg-orange data-[state=active]:text-black font-bold">
                    1D
                </TabsTrigger>
            </TabsList>
        </Tabs>

        <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
                <Switch
                    id="indicators"
                    checked={showIndicators}
                    on:change={setShowIndicators}
                    class="data-[state=checked]:bg-orange"
                />
                <Label htmlFor="indicators" class="font-bold">
                    INDICATORS
                </Label>
            </div>
            <div class="flex items-center space-x-2">
                <Switch
                    id="signals"
                    checked={showSignals}
                    on:change={setShowSignals}
                    class="data-[state=checked]:bg-orange"
                />
                <Label htmlFor="signals" class="font-bold">
                    SIGNALS
                </Label>
            </div>
        </div>
    </div>

    <div class="h-[400px] w-full retro-inset p-4">
        <div class="chart-container" style="width: 100%; height: 400px;">
            <canvas bind:this={chartRef}></canvas>
        </div>
    </div>
</div>

<style>
    .chart-container {
        position: relative;
        margin: auto;
    }
</style>