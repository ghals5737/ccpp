import { writable } from 'svelte/store';
import type { CryptoAsset, PortfolioAsset, BacktestResult, UserSettings } from '$lib/types';

// 더미 데이터
const dummyAssets: CryptoAsset[] = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    current_price: 65000,
    price_change_percentage_24h: 2.5,
    market_cap: 1200000000000,
    total_volume: 45000000000
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    current_price: 3500,
    price_change_percentage_24h: -1.2,
    market_cap: 450000000000,
    total_volume: 25000000000
  },
  // ... 더 많은 더미 데이터
];

const dummyPortfolio: PortfolioAsset[] = [
  {
    ...dummyAssets[0],
    amount: 0.5,
    average_buy_price: 60000,
    total_investment: 30000,
    profit_loss: 2500,
    profit_loss_percentage: 8.33
  },
  {
    ...dummyAssets[1],
    amount: 2,
    average_buy_price: 3000,
    total_investment: 6000,
    profit_loss: 1000,
    profit_loss_percentage: 16.67
  }
];

const dummyBacktestResult: BacktestResult = {
  strategy: 'Moving Average Crossover',
  startDate: '2023-01-01',
  endDate: '2024-01-01',
  initialCapital: 10000,
  finalCapital: 15000,
  totalReturn: 50,
  maxDrawdown: 15,
  sharpeRatio: 1.8,
  trades: [
    {
      date: '2023-01-15',
      type: 'buy',
      symbol: 'BTC',
      price: 40000,
      amount: 0.2,
      total: 8000
    },
    // ... 더 많은 거래 기록
  ]
};

const defaultSettings: UserSettings = {
  theme: 'light',
  currency: 'USD',
  notifications: {
    priceAlerts: true,
    portfolioUpdates: true,
    news: false
  },
  defaultTimeframe: '1d'
};

// 스토어 생성
export const assets = writable<CryptoAsset[]>(dummyAssets);
export const portfolio = writable<PortfolioAsset[]>(dummyPortfolio);
export const backtestResult = writable<BacktestResult | null>(dummyBacktestResult);
export const settings = writable<UserSettings>(defaultSettings);

// 포트폴리오 요약 정보
export const portfolioSummary = writable({
  totalValue: 0,
  totalProfitLoss: 0,
  profitLossPercentage: 0
});

// 포트폴리오 요약 정보 업데이트
portfolio.subscribe(assets => {
  const summary = assets.reduce((acc, asset) => ({
    totalValue: acc.totalValue + (asset.current_price * asset.amount),
    totalProfitLoss: acc.totalProfitLoss + asset.profit_loss,
    profitLossPercentage: 0 // 계산 필요
  }), { totalValue: 0, totalProfitLoss: 0, profitLossPercentage: 0 });

  portfolioSummary.set({
    ...summary,
    profitLossPercentage: (summary.totalProfitLoss / (summary.totalValue - summary.totalProfitLoss)) * 100
  });
}); 