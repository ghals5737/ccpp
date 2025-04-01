export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
}

export interface PortfolioAsset extends CryptoAsset {
  amount: number;
  average_buy_price: number;
  total_investment: number;
  profit_loss: number;
  profit_loss_percentage: number;
}

export interface BacktestResult {
  strategy: string;
  startDate: string;
  endDate: string;
  initialCapital: number;
  finalCapital: number;
  totalReturn: number;
  maxDrawdown: number;
  sharpeRatio: number;
  trades: Trade[];
}

export interface Trade {
  date: string;
  type: 'buy' | 'sell';
  symbol: string;
  price: number;
  amount: number;
  total: number;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  currency: 'USD' | 'KRW';
  notifications: {
    priceAlerts: boolean;
    portfolioUpdates: boolean;
    news: boolean;
  };
  defaultTimeframe: '1d' | '1w' | '1m' | '3m' | '1y';
} 