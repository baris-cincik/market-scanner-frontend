import axios from 'axios';
import { EXCHANGES, PAIRS, BACKEND_URL } from '../utils/MyConstants';
import { OrderBook } from '../models/OrderBook';
import { RecentTrades } from '../models/RecentTrades';

//ATTENTION: When you see CORS policty error this means the backend failed to send a proper response
//this could be because your parameters are wrong

//fetches pairs for the given exc and sets to the appropriate pair variable
export function fetchPairs(exchange, type) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.post(`${BACKEND_URL}/pairs`, {
        exchange: exchange,
      });
      let response = res.data; //array
      console.log(response);
      let pairs = response.pairs;
      return resolve(pairs);
      //setExchangeList(response);
    } catch (error) {
      console.log('Error during POST request: ' + error);
      alert(error.message);
      return resolve(null);
    }
  });
}

export function fetchExchanges() {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.post(`${BACKEND_URL}/exchanges`, {
        empty: '',
      });
      let exchanges = res.data; //array
      //console.log(response);
      return resolve(exchanges);
    } catch (error) {
      console.log('Error during POST request: ' + error);
      alert(error.message);
      return resolve(null);
    }
  });
}

export function fetchOrderBook(exchange, symbol) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.post(`${BACKEND_URL}/order-book`, {
        exchange: exchange,
        symbol: symbol,
      });
      let response = res.data; //array
      //console.log(response);
      let orderBook = new OrderBook(response);
      return resolve(orderBook);
      //setExchangeList(response);
    } catch (error) {
      console.log('Error during POST request: ' + error);
      alert(error.message);
      return resolve(null);
    }
  });
}

export function fetchRecentTrades(exchange, symbol) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.post(`${BACKEND_URL}/recent-trades`, {
        exchange: exchange,
        symbol: symbol,
      });
      let response = res.data; //array
      let recentTrades = new RecentTrades(response);
      //console.log(recentTrades);
      return resolve(recentTrades);
      //setExchangeList(response);
    } catch (error) {
      console.log('Error during POST request: ' + error);
      alert(error.message);
      return resolve(null);
    }
  });
}
