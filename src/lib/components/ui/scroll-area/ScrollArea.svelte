<script lang="ts">
    import { cn } from "$lib/utils";
    export let className: string = "";
</script>

<div class={cn("relative overflow-hidden", className)}>
    <div class="h-full w-full rounded-[inherit]">
        <div class="h-full w-full overflow-auto">
            <slot />
        </div>
    </div>
</div> 