<script lang="ts">
   import { Terminal, Lock, AlertCircle } from "lucide-svelte"
   import { Button } from "$lib/components/ui/button/index.js";
   import { Input } from "$lib/components/ui/input/index.js";
   const CORRECT_PASSWORD = "admin123"

   let password:string
   let error:string
   let isLoading:boolean

  
   
   
</script>

<div class="flex items-center justify-center min-h-screen bg-[#111111]">
  <Button>Click me</Button>
</div>