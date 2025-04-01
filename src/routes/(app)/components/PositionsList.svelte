<script lang="ts">
  import type { PortfolioAsset } from '$lib/types';
  
  export let positions: PortfolioAsset[] = [];
  
  // Function to close a position manually
  async function closePosition(positionId) {
    try {
      const response = await fetch(`/api/positions/${positionId}/close`, {
        method: 'POST'
      });
      
      if (response.ok) {
        // Remove position from the list
        positions = positions.filter(p => p.id !== positionId);
      }
    } catch (error) {
      console.error('Error closing position:', error);
    }
  }
  
  // Format profit/loss percentage
  function formatPL(value) {
    return value > 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`;
  }
  
  // Get color class based on position type and profit/loss
  function getPositionClass(position) {
    if (position.type === 'long') {
      return position.profitLossPercent > 0 ? 'text-green-500' : 'text-red-500';
    } else {
      return position.profitLossPercent > 0 ? 'text-green-500' : 'text-red-500';
    }
  }
</script>

<div class="bg-white rounded-lg shadow overflow-hidden">
  <div class="px-4 py-5 sm:px-6">
    <h3 class="text-lg font-medium leading-6 text-gray-900">포지션</h3>
  </div>
  <div class="border-t border-gray-200">
    <ul class="divide-y divide-gray-200">
      {#each positions as position}
        <li class="px-4 py-4 sm:px-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <span class="text-lg font-medium text-gray-900">{position.symbol.toUpperCase()}</span>
              </div>
              <div class="ml-4">
                <div class="text-sm text-gray-500">보유량: {position.amount}</div>
                <div class="text-sm text-gray-500">평균 매수가: ${position.average_buy_price.toLocaleString()}</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">
                ${(position.amount * position.current_price).toLocaleString()}
              </div>
              <div class="text-sm {position.profit_loss >= 0 ? 'text-green-600' : 'text-red-600'}">
                {position.profit_loss_percentage >= 0 ? '+' : ''}{position.profit_loss_percentage.toFixed(2)}%
              </div>
            </div>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</div>