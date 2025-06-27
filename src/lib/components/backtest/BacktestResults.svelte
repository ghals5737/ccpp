<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
</script>

<div class="grid grid-cols-5 gap-4">
    <Card.Root class="terminal-section">
      <Card.Header class="py-2 px-3">
        <div class="text-xs text-[#8b949e]">TOTAL TRADES</div>
        <Card.Title class="text-sm font-mono">25</Card.Title>
      </Card.Header>
    </Card.Root>
    <Card.Root class="terminal-section">
      <Card.Header class="py-2 px-3">
        <div class="text-xs text-[#8b949e]">WIN RATE</div>
        <Card.Title class="text-sm font-mono text-[#3fb950]">68.5%</Card.Title>
      </Card.Header>
    </Card.Root>
    <Card.Root class="terminal-section">
      <Card.Header class="py-2 px-3">
        <div class="text-xs text-[#8b949e]">TOTAL PROFIT</div>
        <Card.Title class="text-sm font-mono text-[#3fb950]">$2,345.67</Card.Title>
      </Card.Header>
    </Card.Root>
    <Card.Root class="terminal-section">
      <Card.Header class="py-2 px-3">
        <div class="text-xs text-[#8b949e]">MAX DRAWDOWN</div>
        <Card.Title class="text-sm font-mono text-[#f85149]">-$876.54</Card.Title>
      </Card.Header>
    </Card.Root>
    <Card.Root class="terminal-section">
      <Card.Header class="py-2 px-3">
        <div class="text-xs text-[#8b949e]">SHARPE RATIO</div>
        <Card.Title class="text-sm font-mono">1.87</Card.Title>
      </Card.Header>
    </Card.Root>
  </div>