<script lang="ts">

</script>

<div class="p-4 space-y-4">
    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-1">
        <div class="text-xs text-[#848e9c]">Win Rate</div>
        <div class="text-lg font-bold text-[#02c076] font-mono">68.5%</div>
      </div>
      <div class="space-y-1">
        <div class="text-xs text-[#848e9c]">Total Trades</div>
        <div class="text-lg font-bold text-[#f0f0f0] font-mono">25</div>
      </div>
      <div class="space-y-1">
        <div class="text-xs text-[#848e9c]">Profit</div>
        <div class="text-lg font-bold text-[#02c076] font-mono">+$2,345</div>
      </div>
      <div class="space-y-1">
        <div class="text-xs text-[#848e9c]">Drawdown</div>
        <div class="text-lg font-bold text-[#f6465d] font-mono">-8.7%</div>
      </div>
    </div>

    <div class="space-y-2">
      <div class="text-xs text-[#848e9c]">Performance (Last 30 days)</div>
      <div class="h-16 bg-[#1e2329] rounded flex items-end justify-between px-2 py-2">
        {#each [12, 8, 15, 22, 18, 25, 30, 28, 35, 32, 38, 42, 45, 40] as height}
          <div class="bg-[#02c076] w-2 rounded-t" style={`height: ${((height / 45) * 100)}%`} />
        {/each}
      </div>
    </div>
  </div>