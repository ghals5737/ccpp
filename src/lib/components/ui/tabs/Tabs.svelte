<script lang="ts">
  import { setContext, createEventDispatcher } from "svelte";
  import { writable, derived, type Writable, type Readable } from "svelte/store";

  export let value = "";
  const activeTab = writable(value);
  const dispatch = createEventDispatcher();
  
  interface TabsContext {
    activeTab: Writable<string>;
    registerTab: (tabValue: string) => {
      isActive: Readable<boolean>;
    };
  }
  
  setContext<TabsContext>("tabs", {
    activeTab,
    registerTab: (tabValue: string) => {
      console.log("registerTab", tabValue);
      return {
        isActive: derived(activeTab, $activeTab => $activeTab === tabValue)
      };
    }
  });

  $: $activeTab = value;
  
  // activeTab 값이 변경될 때 이벤트 발생
  activeTab.subscribe(newValue => {
    if (newValue !== value) {
      value = newValue;
      dispatch('change', { value: newValue });
    }
  });
</script>

<div class="w-full" {...$$restProps}>
  <slot />
</div> 