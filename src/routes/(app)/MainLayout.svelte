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
</script>

<style>
    .font-mono {
        font-family: 'JetBrains Mono', monospace;
    }
</style>

<div class="flex min-h-screen flex-col">
    <div class="flex flex-1">
      <div class="w-48 bg-[#161b22] border-r border-[#30363d]">
        <div class="p-3 border-b border-[#30363d]">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs text-[#8b949e]">STRATEGY STATUS</span>
            <div class={`h-2 w-2 rounded-full ${strategyRunning ? "bg-[#3fb950]" : "bg-[#f85149]"}`}></div>
          </div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs text-[#8b949e]">Terminal</span>
            <span class="px-2 py-0.5 bg-[#0d1117] text-[#3fb950] text-xs rounded">CONNECTED</span>
          </div>
          <div class="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onclick={toggleStrategy}
              class="flex-1 text-xs h-7 bg-[#0d1117] border-[#30363d] hover:bg-[#1f2937]"
            >
              {strategyRunning ? "STOP" : "START"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onclick={switchToTerminal}
              class="flex-1 text-xs h-7 bg-[#0d1117] border-[#30363d] hover:bg-[#1f2937]"
            >
              <Code class="h-3 w-3 mr-1" />
              CLI
            </Button>
          </div>
        </div>

        <nav class="mt-2">
          <div class="px-3 py-2 text-xs text-[#8b949e]">NAVIGATION</div>
          {#each navigation as item}
            <a              
              href={item.href}
              class={`
                flex items-center px-3 py-2 text-sm border-l-2
                ${pathname === item.href ? "border-[#3fb950] bg-[#0d1117] text-[#e6edf3]" : "border-transparent text-[#8b949e] hover:bg-[#1f2937]"}
              `}
            >
              <item.icon className="h-4 w-4 mr-3" />
              {item.name}
            </a>
          {/each}
        </nav>

        <div class="absolute bottom-0 w-48 p-3 border-t border-[#30363d] bg-[#161b22]">
          <div class="text-xs text-[#8b949e] mb-1">SYSTEM INFO</div>
          <div class="text-xs text-[#8b949e] flex justify-between">
            <span>CPU:</span>
            <span class="text-[#e6edf3]">12%</span>
          </div>
          <div class="text-xs text-[#8b949e] flex justify-between">
            <span>MEM:</span>
            <span class="text-[#e6edf3]">1.2GB</span>
          </div>
          <div class="text-xs text-[#8b949e] flex justify-between">
            <span>UPTIME:</span>
            <span class="text-[#e6edf3]">3d 7h 22m</span>
          </div>
          <div class="mt-2 flex justify-end">
            <BookOpen
            class="h-4 w-4 text-[#8b949e] hover:text-[#e6edf3] cursor-pointer mr-2"              
            />
            <Code
                class="h-4 w-4 text-[#8b949e] hover:text-[#e6edf3] cursor-pointer mr-2"
                onclick={() => switchToTerminal()}                 
            />
            <Button 
                variant="ghost" 
                size="sm" 
                onclick={() => goto("/login")}
                class="h-4 w-4 p-0" title="Logout"
            >
              <span class="text-[#8b949e] hover:text-[#e6edf3]">EXIT</span>
            </Button>
          </div>
        </div>
      </div>

      <main class="flex-1 overflow-auto terminal-scrollbar">
        <slot />
      </main>
    </div>
  </div>