<script lang="ts">
  import { getContext } from 'svelte';
  import { cn } from "$lib/utils/utils.js";

  let className = "";
  export { className as class };

  interface DropdownContext {
    close: () => void;
  }

  const { close } = getContext<DropdownContext>('dropdown');
  
  function handleClick() {
    close();
  }
</script>

<div
  class={cn(
    "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    className
  )}
  on:click={handleClick}
  {...$$restProps}
>
  <slot />
</div> 