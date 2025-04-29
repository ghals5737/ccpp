<script lang="ts">
  import '../app.css';
  import { BarChart3, ChevronsUpDown, CirclePower, Cog, LogOut, Moon, Sun, User } from 'lucide-svelte';
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

<div class="flex min-h-screen flex-col bg-cream">
  <div class="h-2 w-full retro-stripes"></div>
  <header class="sticky top-0 z-50 flex h-16 items-center bg-navy px-4 md:px-6 text-cream">
    <div class="flex items-center gap-4 md:gap-6">
      <a href="/dashboard" class="flex items-center gap-2 font-bold">
        <CirclePower class="h-6 w-6 text-orange" />
        <span class="hidden md:inline-block font-grotesk text-xl tracking-wider">CRYPTOBOT</span>
      </a>
      <nav class="hidden md:flex items-center gap-6">
        {#each navigation as item}
          <a            
            href={item.href}
            class={`text-sm font-bold uppercase tracking-wider transition-colors hover:text-orange
             ${pathname === item.href ? "text-orange" : "text-cream"}`
             }
          >
            {item.name}
          </a>
        {/each}
      </nav>
    </div>
    <div class="ml-auto flex items-center gap-4">
      <Button
        variant={botRunning ? "default" : "outline"}
        size="sm"
        on:click={toggleBotStatus}
        class={`hidden md:flex retro-button font-bold
         ${botRunning ? "bg-orange hover:bg-orange/90 text-black" : "text-cream border-cream"}`
        }
      >
        {botRunning ? "BOT RUNNING" : "BOT STOPPED"}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle Theme"
        class="mr-2 text-cream hover:text-orange"
        on:click={() => {
          const theme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
          document.documentElement.classList.toggle('dark');
        }}
      >
        <Sun class="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon class="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span class="sr-only">Toggle theme</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" class="rounded-full border-2 border-cream">
            <Avatar class="h-8 w-8" src={Tester} alt="Tester" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="retro-box-sm">
          <DropdownMenuLabel className="font-bold">MY ACCOUNT</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="font-mono">
            <User class="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem class="font-mono">
            <Cog class="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="font-mono">
            <LogOut class="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
<main class="flex-1">
    <slot />
</main>
</div>