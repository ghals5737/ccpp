<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { cn } from "$lib/utils/utils.js";

  let className = "";
  export { className as class };

  const isOpen = writable(false);
  
  setContext('dropdown', {
    isOpen,
    close: () => {
      $isOpen = false;
    }
  });
  
  // 외부 클릭 시 드롭다운 닫기
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-menu')) {
      $isOpen = false;
    }
  }
  
  // 컴포넌트가 마운트되면 이벤트 리스너 추가
  import { onMount } from 'svelte';
  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div class={cn("relative inline-block text-left dropdown-menu", className)} {...$$restProps}>
  <slot />
</div> 