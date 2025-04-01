<script lang="ts">
  export let title: string;
  export let value: string | number;
  export let change: number;
  export let icon: string;
</script>

<div class="bg-white rounded-lg shadow p-6">
  <div class="flex items-center">
    <div class="flex-shrink-0">
      <span class="text-2xl">{icon}</span>
    </div>
    <div class="ml-4">
      <h3 class="text-sm font-medium text-gray-500">{title}</h3>
      <div class="mt-1">
        <p class="text-2xl font-semibold text-gray-900">{value}</p>
        <p class="text-sm {change >= 0 ? 'text-green-600' : 'text-red-600'}">
          {change >= 0 ? '+' : ''}{change.toFixed(2)}%
        </p>
      </div>
    </div>
  </div>
</div>