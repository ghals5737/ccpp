<script lang="ts">
  import type { Trade } from '$lib/types';
  
  export let trades: Trade[] = [];
  
  // Format profit/loss amount
  function formatPL(value) {
    return value > 0 ? `+$${value.toFixed(2)}` : `-$${Math.abs(value).toFixed(2)}`;
  }
  
  // Get color class based on profit/loss
  function getPLClass(value) {
    return value > 0 ? 'text-green-500' : 'text-red-500';
  }
</script>

<div class="bg-white rounded-lg shadow overflow-hidden">
  <div class="px-4 py-5 sm:px-6">
    <h3 class="text-lg font-medium leading-6 text-gray-900">거래 내역</h3>
  </div>
  <div class="border-t border-gray-200">
    <ul class="divide-y divide-gray-200">
      {#each trades as trade}
        <li class="px-4 py-4 sm:px-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <span class="text-lg font-medium {trade.type === 'buy' ? 'text-green-600' : 'text-red-600'}">
                  {trade.type === 'buy' ? '매수' : '매도'}
                </span>
              </div>
              <div class="ml-4">
                <div class="text-sm text-gray-500">{trade.symbol}</div>
                <div class="text-sm text-gray-500">{new Date(trade.date).toLocaleString()}</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">
                ${trade.total.toLocaleString()}
              </div>
              <div class="text-sm text-gray-500">
                {trade.amount} @ ${trade.price.toLocaleString()}
              </div>
            </div>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</div>