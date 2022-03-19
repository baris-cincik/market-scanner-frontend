const IS_DEV_BACKEND = false;
export const BACKEND_URL = IS_DEV_BACKEND
  ? 'http://localhost:5000'
  : 'https://market-scanner-backend.herokuapp.com';
export const EXCHANGES = ['binance', 'kucoin'];
export const PAIRS = ['BTC-USDT', 'ETH-USDT'];
