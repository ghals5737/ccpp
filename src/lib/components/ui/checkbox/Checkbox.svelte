<script lang="ts">
  import { cn } from "$lib/utils";
  import type { HTMLAttributes } from "svelte/elements";

  export let checked: boolean = false;
  export let disabled: boolean = false;
  export let className: string = "";
  export let id: string = "";
</script>

<input
  type="checkbox"
  {id}
  bind:checked
  {disabled}
  class={cn(
    "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
    className
  )}
  {...$$restProps}
/> 