<script lang="ts">
   import { Terminal, Lock, AlertCircle } from "lucide-svelte"
   import { Button } from "$lib/components/ui/button/index.js";
   import { Input } from "$lib/components/ui/input/index.js";
   import * as Card from "$lib/components/ui/card/index.js";
   import * as Alert from "$lib/components/ui/alert/index.js";
   import { page } from "$app/stores";
   import { goto } from "$app/navigation";
   const CORRECT_PASSWORD = "admin123"

   let password:string=""
   let error:string=""
   let isLoading:boolean=false

   const handleSubmit = (e: Event) => {
    e.preventDefault()
    isLoading=true
    error=""

    // 비밀번호 검증 (실제 앱에서는 서버 측 검증을 사용해야 합니다)
    setTimeout(() => {
      if (password === CORRECT_PASSWORD) {
        // 로그인 성공 시 세션 스토리지에 인증 상태 저장
        sessionStorage.setItem("isAuthenticated", "true")
        goto("/dashboard")
      } else {
        error="Invalid password. Access denied."
        isLoading=false
      }
    }, 800) // 로딩 효과를 위한 지연
  }
   
   
</script>

<div class="flex items-center justify-center min-h-screen bg-[#111111]">
      <Card.Root class="w-[350px] bg-[#161b22] border-[#30363d] shadow-lg">
      <Card.Header class="pb-2">
        <div class="flex items-center justify-center mb-2">
          <Terminal class="h-8 w-8 text-[#3fb950]" />
        </div>
        <h1 class="text-center text-lg font-bold text-[#e6edf3]">Trading System</h1>
        <p class="text-center text-xs text-[#8b949e] mt-1">v1.0.3</p>
      </Card.Header>
      <Card.Content>
        <form onsubmit={handleSubmit} class="space-y-4">
          <div class="space-y-2">
            <div class="relative">
              <Lock class="absolute left-3 top-2.5 h-4 w-4 text-[#8b949e]" />
              <Input
                type="password"
                placeholder="Enter system password"
                value={password}
                oninput={(e: Event) => password = (e.target as HTMLInputElement).value}
                class="pl-10 h-9 bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder:text-[#8b949e] focus-visible:ring-[#3fb950]"
                autoFocus
              />
            </div>
          </div>

          {#if error}
            <Alert.Root className="bg-[#2d1213] border-[#f85149] text-[#f85149] py-2">
              <AlertCircle class="h-4 w-4" />
              <Alert.Description class="text-xs">Invalid password. Access denied.</Alert.Description>
            </Alert.Root>
          {/if}
        </form>
      </Card.Content>
      <Card.Footer>
        <Button
          onclick={handleSubmit}
          disabled={isLoading || !password}
          class="w-full h-9 bg-[#1e3a2f] text-[#3fb950] border border-[#3fb950] hover:bg-[#2a4f3e]"
        >
          {isLoading ? "AUTHENTICATING..." : "ACCESS SYSTEM"}
        </Button>
      </Card.Footer>    
    </Card.Root>
</div>