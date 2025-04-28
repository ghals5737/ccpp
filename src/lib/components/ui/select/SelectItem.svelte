<script lang="ts">
  import { getContext } from 'svelte';
  import { Check } from 'lucide-svelte';
  import { cn } from "$lib/utils/utils.js";
  import type { Writable } from 'svelte/store';

  let className = "";
  export { className as class };
  

  export let value: any;
  
  interface SelectContext {
    selectValue: Writable<any>;
    select: (value: any) => void;
  }
  
  const { selectValue, select } = getContext<SelectContext>('select');
</script>

<div
  class={cn(
    "relative flex cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    className
  )}
  on:click={() => select(value)}
  {...$$restProps}
>
  <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
    {#if $selectValue === value}
      <Check class="h-4 w-4" />
    {/if}
  </span>
  <slot />
</div> 