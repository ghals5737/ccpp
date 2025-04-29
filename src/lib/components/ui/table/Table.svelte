<script lang="ts">
    import { cn } from "$lib/utils";
    export let className: string = "";
</script>

<div class={cn("w-full overflow-auto", className)}>
    <table class="w-full caption-bottom text-sm">
        <slot />
    </table>
</div> 