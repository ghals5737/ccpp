<script lang="ts">
  import { getContext } from "svelte";
  import { cn } from "$lib/utils/utils.js";
  import type { Readable, Writable } from 'svelte/store';

  let className = "";
  export { className as class };
  export let value: string;

  interface TabsContext {
    activeTab: Writable<string>;
    registerTab: (value: string) => { isActive: Readable<boolean> };
  }

  const { registerTab } = getContext<TabsContext>("tabs");
  const { isActive } = registerTab(value);
</script>

{#if $isActive}
  <div
    role="tabpanel"
    class={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...$$restProps}
  >
    <slot />
  </div>
{/if} 