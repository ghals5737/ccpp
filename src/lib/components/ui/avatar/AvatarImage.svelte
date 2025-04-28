<script lang="ts">
  import { cn } from "$lib/utils/utils.js";

  let className = "";
  export { className as class };

  export let src: string;
  export let alt: string;
</script>

<img
  {src}
  {alt}
  class={cn(
    "h-full w-full object-cover",
    className
  )}
  {...$$restProps}
/> 