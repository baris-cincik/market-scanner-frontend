const IS_DEV_BACKEND = true;
export const BACKEND_URL = IS_DEV_BACKEND
  ? 'http://127.0.0.1:5000'
  : 'https://<XXXXXXXX>.herokuapp.com';
export const EXCHANGES = ['binance', 'kucoin'];
export const PAIRS = ['BTC-USDT', 'ETH-USDT'];
