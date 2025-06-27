<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import { onMount } from "svelte";

    let canvasRef: HTMLCanvasElement | null = null
    let timeframe = "1h"
    let showIndicators = true
    let showSignals = true
    let chart: any = null

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

    $: if (timeframe) {
        loadChart();
    }

    async function loadChart() {
        if (typeof window !== "undefined") {
            const { Chart, registerables } = await import("chart.js")
            Chart.register(...registerables)

            if (canvasRef) {
                const ctx = canvasRef.getContext("2d")
                if (ctx) {
                    // Destroy existing chart
                    if (chart) {
                        chart.destroy()
                    }

                    chart = new Chart(ctx, {
                        type: "line",
                        data: {
                            labels: data.map((d) => d.time),
                            datasets: [
                                {
                                    label: "Price",
                                    data: data.map((d) => d.price),
                                    borderColor: "#02c076",
                                    backgroundColor: "rgba(2, 192, 118, 0.1)",
                                    borderWidth: 2,
                                    fill: true,
                                    tension: 0.4,
                                    pointRadius: 0,
                                    pointHoverRadius: 4,
                                },
                            ],
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false,
                                },
                                tooltip: {
                                    backgroundColor: "#2b3139",
                                    titleColor: "#f0f0f0",
                                    bodyColor: "#f0f0f0",
                                    borderColor: "#3c4043",
                                    borderWidth: 1,
                                },
                            },
                            scales: {
                                x: {
                                    grid: {
                                        color: "rgba(60, 64, 67, 0.3)",
                                    },
                                    ticks: {
                                        color: "#848e9c",
                                        font: {
                                            size: 10,
                                        },
                                    },
                                },
                                y: {
                                    grid: {
                                        color: "rgba(60, 64, 67, 0.3)",
                                    },
                                    ticks: {
                                        color: "#848e9c",
                                        font: {
                                            size: 10,
                                        },
                                    },
                                },
                            },
                            interaction: {
                                intersect: false,
                                mode: "index",
                            },
                        },
                    })
                }
            }
        }
    }

    onMount(() => {
        loadChart();
        return () => {
            if (chart) {
                chart.destroy()
            }
        }
    });
</script>

<div class="p-4 space-y-4">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex text-xs bg-[#1e2329] border border-[#3c4043] rounded">
            {#each ["1m", "5m", "15m", "1h", "4h", "1d"] as tf}
                <button
                    class={`px-3 py-1.5 first:rounded-l last:rounded-r ${
                        timeframe === tf
                            ? "bg-[#fcd535] text-[#1e2329] font-semibold"
                            : "text-[#848e9c] hover:bg-[#3c4043] hover:text-[#f0f0f0]"
                    }`}
                    on:click={() => timeframe = tf}
                >
                    {tf.toUpperCase()}
                </button>
            {/each}
        </div>

        <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
                <Switch
                    id="indicators"
                    bind:checked={showIndicators}          
                    class="data-[state=checked]:bg-[#02c076]"
                />
                <Label for="indicators" class="text-xs text-[#848e9c]">
                    INDICATORS
                </Label>
            </div>
            <div class="flex items-center space-x-2">
                <Switch
                    id="signals"
                    bind:checked={showSignals}
                    class="data-[state=checked]:bg-[#02c076]"
                />
                <Label for="signals" class="text-xs text-[#848e9c]">
                    SIGNALS
                </Label>
            </div>
        </div>
    </div>

    <div class="h-[300px] md:h-[400px] w-full bg-[#1e2329] border border-[#3c4043] rounded p-2">
        <canvas bind:this={canvasRef} />
    </div>
</div>