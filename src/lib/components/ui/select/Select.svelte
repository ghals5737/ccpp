<script lang="ts">
  import { cn } from "$lib/utils/utils.js";

  let className = "";
  export { className as class };
  import { createEventDispatcher, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  
  export let value: any;
  const dispatch = createEventDispatcher();
  const selectValue = writable(value);
  const isOpen = writable(false);
  
  setContext('select', {
    selectValue,
    isOpen,
    select: (val: any) => {
      value = val;
      $selectValue = val;
      isOpen.set(false);
      dispatch('change', val);
    },
    toggle: () => {
      isOpen.update(v => !v);
    }
  });
  
  $: $selectValue = value;
</script>

<div class={cn("relative w-full", className)} {...$$restProps} >
  <slot />
</div> 