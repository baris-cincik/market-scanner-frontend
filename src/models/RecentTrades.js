//converts the json to a reasonable object
export function RecentTrades(trades) {
  //reverse the order to have most recent trade first
  let reversed = trades.reverse();
  trades = reversed;
  //console.log(trades);
  //convert dates
  trades.forEach((trade) => {
    let str = trade.datetime;
    let date = new Date(str);
    trade.datetime = date;
    //console.log(date);
  });

  //console.log(new Date());
  return trades;
}
