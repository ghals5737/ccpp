<script lang="ts">
    import { cn } from "$lib/utils";
    export let className: string = "";
</script>

<h5 class={cn("mb-1 font-medium leading-none tracking-tight", className)}>
    <slot />
</h5> 