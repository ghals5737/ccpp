<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { Code, BarChart3, LayoutList, Cog, LineChart, FileText, BookOpen } from "lucide-svelte";    
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    let pathname = $page.url.pathname;
    let strategyRunning = false;

    const toggleStrategy = () => {
        strategyRunning = !strategyRunning;
    }

    const switchToTerminal = () => {
        goto("/terminal")
    }

    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
        { name: "Positions", href: "/positions", icon: LayoutList },
        { name: "Strategy", href: "/strategy", icon: Cog },
        { name: "Backtest", href: "/backtest", icon: LineChart },
        { name: "Logs", href: "/logs", icon: FileText },
    ]

    const logout = () => {
        goto("/login")
    }
    
</script>

<style>
    .font-mono {
        font-family: 'JetBrains Mono', monospace;
    }
</style>

<div class="flex min-h-screen flex-col bg-[#1e2329]">
  <div class="flex flex-1">
    <div class="w-48 bg-[#2b3139] border-r border-[#3c4043]">
      <div class="p-3 border-b border-[#3c4043]">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-[#848e9c] uppercase tracking-wide">Strategy Status</span>
          <div class={`h-2 w-2 rounded-full ${strategyRunning ? "bg-[#02c076]" : "bg-[#f6465d]"}`}></div>
        </div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-[#848e9c]">Terminal</span>
          <span class="px-2 py-0.5 bg-[#1e2329] text-[#02c076] text-xs rounded border border-[#3c4043]">
            CONNECTED
          </span>
        </div>
        <div class="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onclick={toggleStrategy}
            class="flex-1 text-xs h-7 bg-[#1e2329] border-[#3c4043] hover:bg-[#3c4043] text-[#f0f0f0]"
          >
            {strategyRunning ? "STOP" : "START"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onclick={switchToTerminal}
            class="flex-1 text-xs h-7 bg-[#1e2329] border-[#3c4043] hover:bg-[#3c4043] text-[#f0f0f0]"
          >
            <Code class="h-3 w-3 mr-1" />
            CLI
          </Button>
        </div>
      </div>

      <nav class="mt-2">
        <div class="px-3 py-2 text-xs text-[#848e9c] uppercase tracking-wide">Navigation</div>
        {#each navigation as item}
          <a
            href={item.href}
            class={`flex items-center px-3 py-2 text-sm border-l-2 transition-colors ${pathname === item.href ? "border-[#fcd535] bg-[#1e2329] text-[#f0f0f0] font-medium" : "border-transparent text-[#848e9c] hover:bg-[#3c4043] hover:text-[#f0f0f0]"}`}
          >
            <item.icon class="h-4 w-4 mr-3" />
            {item.name}
          </a>
        {/each}
      </nav>

      <div class="absolute bottom-0 w-48 p-3 border-t border-[#3c4043] bg-[#2b3139]">
        <div class="text-xs text-[#848e9c] mb-1 uppercase tracking-wide">System Info</div>
        <div class="text-xs text-[#848e9c] flex justify-between">
          <span>CPU:</span>
          <span class="text-[#f0f0f0]">12%</span>
        </div>
        <div class="text-xs text-[#848e9c] flex justify-between">
          <span>MEM:</span>
          <span class="text-[#f0f0f0]">1.2GB</span>
        </div>
        <div class="text-xs text-[#848e9c] flex justify-between">
          <span>UPTIME:</span>
          <span class="text-[#f0f0f0]">3d 7h 22m</span>
        </div>
        <div class="mt-2 flex justify-end space-x-2">
          <BookOpen
            class="h-4 w-4 text-[#848e9c] hover:text-[#fcd535] cursor-pointer transition-colors"            
          />
          <Code
            class="h-4 w-4 text-[#848e9c] hover:text-[#fcd535] cursor-pointer transition-colors"
            onclick={switchToTerminal}            
          />
          <Button variant="ghost" size="sm" onclick={logout} class="h-4 w-auto p-0" title="Logout">
            <span class="text-xs text-[#848e9c] hover:text-[#f6465d] transition-colors">EXIT</span>
          </Button>
        </div>
      </div>
    </div>

    <main class="flex-1 overflow-auto terminal-scrollbar bg-[#1e2329]">
      <slot />
    </main>
  </div>
</div>