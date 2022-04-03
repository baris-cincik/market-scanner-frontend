import axios from 'axios';
import { EXCHANGES, PAIRS, BACKEND_URL } from '../utils/MyConstants';
import { TrackerData } from '../tracker/TrackerData';

//ATTENTION: When you see CORS policty error this means the backend failed to send a proper response
//this could be because your parameters are wrong

//fetches metadata for all trackers
export function fetchAllTrackersMetadata() {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.post(`${BACKEND_URL}/all-tracker-metadata`, {});
      let response = res.data; //array
      console.log(response);
      if (response.isSuccess) {
        //perform parsing
        return resolve(response.data.metadata);
      } else {
        alert(response.error);
        return resolve(null);
      }

      //setExchangeList(response);
    } catch (error) {
      console.log('POST request could not be executed properly: ' + error);
      alert(error.message);
      return reject();
    }
  });
}

//fetches metadata of the specified tracker
export function fetchTrackerMetadata(id) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.post(`${BACKEND_URL}/get-tracker-metadata`, {
        id: id,
      });
      let response = res.data; //array
      console.log(response);
      if (response.isSuccess) {
        //perform parsing
        return resolve(response.data.metadata);
      } else {
        alert(response.error);
        return resolve(null);
      }

      //setExchangeList(response);
    } catch (error) {
      console.log('POST request could not be executed properly: ' + error);
      alert(error.message);
      return reject();
    }
  });
}
//1647794629
//fetches metadata of the specified tracker
export function fetchTrackerData(id) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.post(`${BACKEND_URL}/tracker-data`, {
        id: id,
      });
      let response = res.data; //array
      console.log(response);
      if (response.isSuccess) {
        //perform parsing
        //let trackerData = TrackerData(response.data.records);
        let trackerData = response.data.records;
        return resolve(trackerData);
      } else {
        alert(response.error);
        return resolve(null);
      }

      //setExchangeList(response);
    } catch (error) {
      console.log('POST request could not be executed properly: ' + error);
      alert(error.message);
      return reject();
    }
  });
}

//crates a new tracker with the specified metadata
export function createTracker(low_exchange, high_exchange, pair, frequency) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.post(`${BACKEND_URL}/create-tracker`, {
        low_exchange: low_exchange,
        high_exchange: high_exchange,
        pair: pair,
        frequency: frequency.toString(),
      });
      let response = res.data; //array
      console.log(response);
      if (response.isSuccess) {
        //perform parsing
        return resolve(response.data);
      } else {
        alert(response.error);
        return resolve(null);
      }

      //setExchangeList(response);
    } catch (error) {
      console.log('POST request could not be executed properly: ' + error);
      alert(error.message);
      return reject();
    }
  });
}

export function stopTracker(id) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.post(`${BACKEND_URL}/stop-tracker`, {
        id: id,
      });
      let response = res.data; //array
      console.log(response);
      if (response.isSuccess) {
        //perform parsing
        return resolve(true);
      } else {
        return resolve(response.error);
      }
    } catch (error) {
      console.log('POST request could not be executed properly: ' + error);
      alert(error.message);
      return reject();
    }
  });
}

export function restartTracker(id) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.post(`${BACKEND_URL}/restart-tracker`, {
        id: id,
      });
      let response = res.data; //array
      console.log(response);
      if (response.isSuccess) {
        //perform parsing
        return resolve(true);
      } else {
        return resolve(response.error);
      }
    } catch (error) {
      console.log('POST request could not be executed properly: ' + error);
      alert(error.message);
      return reject();
    }
  });
}

export function deleteTracker(id) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.post(`${BACKEND_URL}/delete-tracker`, {
        id: id,
      });
      let response = res.data;
      console.log(response);
      if (response.isSuccess) {
        return resolve(true);
      } else {
        return resolve(response.error);
      }
    } catch (error) {
      console.log('POST request could not be executed properly: ' + error);
      alert(error.message);
      return reject();
    }
  });
}

//fetches pairs for the given exc and sets to the appropriate pair variable
export function testIsBackendRunning() {
  return new Promise(async function (resolve, reject) {
    try {
      console.log('check1');
      const res = await axios.post(`${BACKEND_URL}/trackers`, {});
      console.log('check2');
      let response = res.data;
      console.log(response);
      return resolve(response);
    } catch (error) {
      console.log('Error during POST request: ' + error);
      alert(error.message);
      return resolve(null);
    }
  });
}
