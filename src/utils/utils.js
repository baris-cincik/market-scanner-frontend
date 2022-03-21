export function dateDiff(date1, date2) {
  let time1 = date1.getTime();
  let time2 = date2.getTime();
  //console.log(time2 - time1);
  var seconds = Math.abs(date1 - date2) / 1000;
  //console.log(hours);
  let hms = secondsToHMS(seconds);
  return hms;
}

function secondsToHMS(secs) {
  secs = Math.round(secs);
  var hours = Math.floor(secs / (60 * 60));

  var divisor_for_minutes = secs % (60 * 60);
  var minutes = Math.floor(divisor_for_minutes / 60);

  var divisor_for_seconds = divisor_for_minutes % 60;
  var seconds = Math.ceil(divisor_for_seconds);

  var obj = {
    h: hours,
    m: minutes,
    s: seconds,
  };
  //console.log('secs: ' + secs + ' hours: ' + obj.h);
  return obj;
}

export function sortRecordsByTime(records) {
  records.sort(byTime);
}
function byTime(record1, record2) {
  //convert time string to date
  let date1 = Date.parse(record1.time);
  let date2 = Date.parse(record2.time);
  if (date1 < date2) {
    return -1; //record1 before record2
  }
  if (date2 < date1) {
    return 1; //record2 before record1
  }
  return 0;
}

export function sortRecordsByProfit(records) {
  records.sort(byProfit);
}

function byProfit(record1, record2) {
  //convert time string to date
  let profit1 = Math.max(
    Number(record1.profit_buy_sell),
    Number(record1.profit_sell_buy)
  );
  let profit2 = Math.max(
    Number(record2.profit_buy_sell),
    Number(record2.profit_sell_buy)
  );
  if (profit1 > profit2) {
    return -1; //record1 before record2
  }
  if (profit2 > profit1) {
    return 1; //record2 before record1
  }
  return 0;
}
