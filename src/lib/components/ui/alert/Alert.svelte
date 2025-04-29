<script lang="ts">
    import { cn } from "$lib/utils";
    export let variant: "default" | "destructive" = "default";
    export let className: string = "";
</script>

<div
    role="alert"
    class={cn(
        "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
        {
            "border-muted bg-background text-foreground": variant === "default",
            "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive": variant === "destructive"
        },
        className
    )}
>
    <slot />
</div> 