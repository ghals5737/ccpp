<script lang="ts">
    import { BarChart3, ChevronsUpDown, CirclePower, Cog, LogOut, Moon, Sun, User } from 'lucide-svelte';
    import { page } from '$app/stores';
    import { theme } from '$lib/stores/theme';
    import Button from '$lib/components/ui/button/Button.svelte';
    import DropdownMenu from '$lib/components/ui/dropdown-menu/dropdown-menu.svelte';
    import DropdownMenuContent from '$lib/components/ui/dropdown-menu/dropdown-menu-content.svelte';
    import DropdownMenuItem from '$lib/components/ui/dropdown-menu/dropdown-menu-item.svelte';
    import DropdownMenuTrigger from '$lib/components/ui/dropdown-menu/dropdown-menu-trigger.svelte';
    import DropdownMenuLabel from '$lib/components/ui/dropdown-menu/dropdown-menu-label.svelte';
    import DropdownMenuSeparator from '$lib/components/ui/dropdown-menu/dropdown-menu-separator.svelte';
    import Avatar from '$lib/components/ui/avatar/Avatar.svelte';
    import AvatarImage from '$lib/components/ui/avatar/AvatarImage.svelte';
    import Tester from '$lib/static/tester.svg'
    
    let botRunning = false;
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

<div class="flex min-h-screen flex-col">
    <header class="sticky top-0 z-50 flex h-16 items-center border-b bg-background px-4 md:px-6">
      <div class="flex items-center gap-4 md:gap-6">
        <a href="/dashboard" class="flex items-center gap-2 font-semibold">
          <CirclePower class="h-6 w-6 text-primary" />
          <span class="hidden md:inline-block">CryptoBot</span>
        </a>
        <nav class="hidden md:flex items-center gap-6">
          {#each navigation as item}
            <a
              href={item.href}
              class={`text-sm font-medium transition-colors hover:text-primary ${pathname === item.href ? "text-primary" : "text-muted-foreground"}`}
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
          onClick={toggleBotStatus}
          class={`hidden md:flex ${botRunning ? "bg-green-600 hover:bg-green-700" : "text-muted-foreground"}`}
        >
          {botRunning ? "Bot Running" : "Bot Stopped"}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle Theme"
          class="mr-2"
          on:click={() => theme.toggle()}
        >
          <Sun class="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon class="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span class="sr-only">Toggle theme</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" class="rounded-full">
              <Avatar class="h-8 w-8" src={Tester} alt="User">                
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User class="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Cog class="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
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
