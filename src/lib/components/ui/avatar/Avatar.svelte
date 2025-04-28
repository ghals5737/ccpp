<script lang="ts">
  import { cn } from "$lib/utils";
  import type { HTMLAttributes } from "svelte/elements";

  export let className: string = "";
  export let src: string | undefined = undefined;
  export let alt: string = "";
  export let fallback: string = "";
</script>

<div
  class={cn(
    "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
    className
  )}
  {...$$restProps}
>
  {#if src}
    <img class="aspect-square h-full w-full" {src} {alt} />
  {/if}
  {#if fallback}
    <div class="flex h-full w-full items-center justify-center rounded-full bg-muted">
      {fallback}
    </div>
  {/if}
</div> 