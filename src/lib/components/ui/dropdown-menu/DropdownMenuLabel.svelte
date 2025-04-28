<script lang="ts">
  export let className: string = '';
</script>

<div class="px-2 py-1.5 text-sm font-semibold {className}">
  <slot />
</div> 