<script lang="ts">
    import { cn } from "$lib/utils";
    export let className: string = "";
</script>

<thead class={cn("[&_tr]:border-b", className)}>
    <slot />
</thead> 