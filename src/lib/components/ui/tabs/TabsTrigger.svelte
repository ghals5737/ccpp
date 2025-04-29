<script lang="ts">
  import { getContext } from "svelte";
  import { cn } from "$lib/utils/utils.js";
  import type { Writable, Readable } from "svelte/store";

  let className = "";
  export { className as class };
  export let value: string;
  export let disabled = false;

  interface TabsContext {
    activeTab: Writable<string>;
    registerTab: (tabValue: string) => {
      isActive: Readable<boolean>;
    };
  }

  const { registerTab, activeTab } = getContext<TabsContext>("tabs");
  const { isActive } = registerTab(value);
  
  function handleClick() {
    if (!disabled) {
      $activeTab = value;
    }
  }
</script>

<button
  role="tab"
  class={cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    $isActive && "bg-[#EEEEEE] text-[#00ADB5] shadow-sm",
    className
  )}
  {disabled}
  aria-selected={$isActive}
  on:click={handleClick}
  {...$$restProps}
>
  <slot />
</button> 