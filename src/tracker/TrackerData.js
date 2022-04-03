//model class used for parsing

import { toTimestamp } from '../utils/utils';

//DEPRECATED
export function TrackerData(dataArr) {
  dataArr.forEach(function (record, i) {
    //perform any configurations
    dataArr[i].time = toTimestamp(dataArr[i].time);
  });
  return dataArr;
}
