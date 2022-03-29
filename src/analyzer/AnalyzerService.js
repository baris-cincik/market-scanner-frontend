import axios from 'axios';
import { EXCHANGES, PAIRS, BACKEND_URL } from '../utils/MyConstants';

//call with the formData object
export function analyzeTradesFile(file) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.post(`${BACKEND_URL}/analyze-trades`, file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      let response = res.data; //array
      console.log(response);
      if (response.isSuccess) {
        //perform parsing
        let data = response.data;
        //console.log(data);
        return resolve(data);
      } else {
        alert(response.error);
        return resolve(null);
      }

      //setExchangeList(response)
    } catch (error) {
      console.log(
        'POST request could not be executed properly or the response wasnt parsed: ' +
          error
      );
      alert(error.message);
      return reject();
    }
  });
}
