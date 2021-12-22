const OrderBookLimit = 10;

//converts the json to a reasonable object
export function OrderBook(ob) {
  ob.bids = ob.bids.slice(0, OrderBookLimit);
  ob.asks = ob.asks.slice(0, OrderBookLimit);
  //console.log(ob);
  return ob;
}
