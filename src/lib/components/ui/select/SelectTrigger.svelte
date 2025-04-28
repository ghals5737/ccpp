<script lang="ts">
  import { ChevronDown } from 'lucide-svelte';
  import { cn } from "$lib/utils/utils.js";
  import { getContext } from 'svelte';

  let className = "";
  export { className as class };
  
  const { toggle } = getContext('select');
</script>

<div
  class={cn(
    "flex h-10 w-full items-center justify-between rounded-md bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
    className
  )}
  on:click={toggle}
  {...$$restProps}
>
  <slot />
  <ChevronDown class="h-4 w-4 opacity-50" />
</div> 