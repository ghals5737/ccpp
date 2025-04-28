<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import { cn } from "$lib/utils/utils.js";

  interface SelectContext {
    selectValue: Writable<any>;
  }

  const { selectValue } = getContext<SelectContext>('select');

  let className = "";
  export { className as class };
  export let placeholder = "";
</script>

<span class={cn("block truncate", className)}>
  {#if $selectValue}
    <slot>{$selectValue}</slot>
  {:else}
    <slot>{placeholder}</slot>
  {/if}
</span> 