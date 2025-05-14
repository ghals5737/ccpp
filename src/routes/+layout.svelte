<script lang="ts">
  import '../app.css';
  import { BarChart3, ChevronsUpDown, CirclePower, Cog, LogOut, Moon, Sun, User, X, Terminal } from 'lucide-svelte';
  import { page } from '$app/stores';
  import { theme } from '$lib/stores/theme';
  import Button from '$lib/components/ui/button/Button.svelte';
  import DropdownMenu from '$lib/components/ui/dropdown-menu/DropdownMenu.svelte';
  import DropdownMenuContent from '$lib/components/ui/dropdown-menu/DropdownMenuContent.svelte';
  import DropdownMenuItem from '$lib/components/ui/dropdown-menu/DropdownMenuItem.svelte';
  import DropdownMenuTrigger from '$lib/components/ui/dropdown-menu/DropdownMenuTrigger.svelte';
  import DropdownMenuLabel from '$lib/components/ui/dropdown-menu/DropdownMenuLabel.svelte';
  import DropdownMenuSeparator from '$lib/components/ui/dropdown-menu/DropdownMenuSeparator.svelte';
  import Avatar from '$lib/components/ui/avatar/Avatar.svelte';    
  import Tester from '$lib/static/tester.svg'
  let botRunning = true;
  function toggleBotStatus() {
      botRunning = !botRunning;
  }
  const navigation = [
      { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
      { name: "Backtesting", href: "/backtesting", icon: ChevronsUpDown },
      { name: "Settings", href: "/settings", icon: Cog },
  ]
  const pathname = $page.url.pathname;
</script>

<div class="flex min-h-screen flex-col font-mono bg-[#0d1117] text-[#e6edf3]">
  <div class="terminal-header flex items-center justify-between">
    <div class="flex items-center">
      <Terminal class="h-4 w-4 mr-2" />
      <span class="font-bold">System Monitor</span>
      <span class="ml-2 text-[#8b949e]">v1.0.3</span>
    </div>
    <div class="flex items-center space-x-2">
      <span class="px-2 py-0.5 bg-[#0d1117] text-[#3fb950] text-xs rounded">CONNECTED</span>
      <X class="h-4 w-4 text-[#8b949e] hover:text-[#e6edf3] cursor-pointer" />
    </div>
  </div>
  <div class="flex flex-1">
    <div class="w-48 bg-[#161b22] border-r border-[#30363d]">
      <div class="p-3 border-b border-[#30363d]">
        <div class="flex items-center justify-between">
          <span class="text-xs text-[#8b949e]">SYSTEM STATUS</span>
          <div class={`h-2 w-2 rounded-full ${botRunning ? "bg-[#3fb950]" : "bg-[#f85149]"}`}></div>
        </div>
        <div class="mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleBotStatus}
            class="w-full text-xs h-7 bg-[#0d1117] border-[#30363d] hover:bg-[#1f2937]"
          >
            {botRunning ? "STOP PROCESS" : "START PROCESS"}
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
            <item.icon class="h-4 w-4 mr-3" />
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
      </div>
    </div>
    <main class="flex-1 overflow-auto terminal-scrollbar">
        <slot />
    </main>
  </div>
</div>