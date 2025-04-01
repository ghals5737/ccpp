<script lang="ts">
  export let profitLoss: number;
  export let profitLossPercentage: number;
</script>

<div class="bg-white rounded-lg shadow p-6">
  <h3 class="text-sm font-medium text-gray-500">손익</h3>
  <div class="mt-2">
    <p class="text-2xl font-semibold {profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}">
      ${profitLoss.toLocaleString()}
    </p>
    <p class="text-sm {profitLossPercentage >= 0 ? 'text-green-600' : 'text-red-600'}">
      {profitLossPercentage >= 0 ? '+' : ''}{profitLossPercentage.toFixed(2)}%
    </p>
  </div>
</div>