<!-- <script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import { onMount } from "svelte";
    import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
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
</script>

<div class="p-3 space-y-3">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div class="flex text-xs bg-[#161b22] border border-[#30363d]">
        {#each ["1m", "5m", "15m", "1h", "4h", "1d"] as tf}
          <button
            class={`px-2 py-1 ${
              timeframe === tf ? "bg-[#0d1117] text-[#e6edf3]" : "text-[#8b949e] hover:bg-[#1f2937]"
            }`}
            onclick={() => timeframe = tf}
          >
            {tf.toUpperCase()}
          </button>
        {/each}
      </div>
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <Switch
            id="indicators"
            checked={showIndicators}
            onCheckedChange={() => showIndicators = !showIndicators}
            class="data-[state=checked]:bg-[#3fb950]"
          />
          <Label htmlFor="indicators" class="text-xs">
            INDICATORS
          </Label>
        </div>
        <div class="flex items-center space-x-2">
          <Switch
            id="signals"
            checked={showSignals}
            onCheckedChange={() => showSignals = !showSignals}
            class="data-[state=checked]:bg-[#3fb950]"
          />
          <Label htmlFor="signals" class="text-xs">
            SIGNALS
          </Label>
        </div>
      </div>
    </div>
    <div class="h-[300px] w-full bg-[#0d1117] border border-[#30363d] p-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 148, 158, 0.2)" />
          <XAxis
            dataKey="time"
            stroke="#8b949e"
            tick={{ fontSize: 10 }}
            tickLine={{ stroke: "#30363d" }}
            axisLine={{ stroke: "#30363d" }}
          />
          <YAxis
            stroke="#8b949e"
            domain={["dataMin - 500", "dataMax + 500"]}
            tick={{ fontSize: 10 }}
            tickLine={{ stroke: "#30363d" }}
            axisLine={{ stroke: "#30363d" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#161b22",
              border: "1px solid #30363d",
              borderRadius: "0",
              color: "#e6edf3",
              fontSize: "11px",
            }}
          />
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3fb950" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3fb950" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="price"
            stroke="#3fb950"
            strokeWidth={1.5}
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
          {#if showSignals}
            <div>             
              <svg>
                <circle cx="20%" cy="30%" r="3" fill="#3fb950" />
                <circle cx="60%" cy="20%" r="3" fill="#3fb950" />
              </svg>              
              <svg>
                <circle cx="40%" cy="15%" r="3" fill="#f85149" />
                <circle cx="80%" cy="25%" r="3" fill="#f85149" />
              </svg>
            </div>
          {/if}
        </AreaChart>
      </ResponsiveContainer>
    </div>
</div> -->