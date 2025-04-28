<script lang="ts">
  import { getContext } from 'svelte';
  import { fade } from 'svelte/transition';
  import { cn } from "$lib/utils/utils.js";
  import type { Writable } from 'svelte/store';
  
  let className = "";
  export { className as class };

  export let align = 'left';
  
  interface DropdownContext {
    isOpen: Writable<boolean>;
    close: () => void;
  }
  
  const { isOpen, close } = getContext<DropdownContext>('dropdown');
</script>

{#if $isOpen}
  <div
    class={cn(
      "absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-2",
      className
    )}
    class:left-0={align === 'left'}
    class:right-0={align === 'right'}
    transition:fade={{ duration: 100 }}
    {...$$restProps}
  >
    <slot />
  </div>
{/if} 