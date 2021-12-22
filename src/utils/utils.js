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
