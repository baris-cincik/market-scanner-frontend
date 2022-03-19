import axios from 'axios';
import { EXCHANGES, PAIRS, BACKEND_URL } from '../utils/MyConstants';

//ATTENTION: When you see CORS policty error this means the backend failed to send a proper response
//this could be because your parameters are wrong

//fetches pairs for the given exc and sets to the appropriate pair variable
export function fetchAllTrackersMetadata() {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.post(`${BACKEND_URL}/all-tracker-metadata`, {
        id: '213123',
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
