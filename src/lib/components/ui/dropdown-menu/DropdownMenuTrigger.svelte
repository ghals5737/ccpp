<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import { cn } from "$lib/utils/utils.js";

  let className = "";
  export { className as class };
  
  interface DropdownContext {
    isOpen: Writable<boolean>;
  }
  
  const { isOpen } = getContext<DropdownContext>('dropdown');
  
  function toggle() {
    $isOpen = !$isOpen;
  }
</script>

<button
  type="button"
  class={cn(
    "inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-medium",
    className
  )}
  on:click={toggle}
  {...$$restProps}
>
  <slot />
</button> 