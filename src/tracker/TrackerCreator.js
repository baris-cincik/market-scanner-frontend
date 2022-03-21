import React, { useEffect, useState } from 'react';
import * as ts from '../api/TrackerService';
import Table from 'react-bootstrap/Table';
import './Trackers.css';
import { CemmInput } from '../utils/CemmInput';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export function TrackerCreator() {
  //the child passes default values for inputs1 and inputs2. They will not be null
  const [inputs1, setInputs1] = useState({
    exchange: null,
    pair: null,
  });
  const [inputs2, setInputs2] = useState({
    exchange: null,
    pair: null,
  });
  const [frequency, setFrequency] = useState(300);

  function handleMarketInfoChange(ex1, ex2, pair1, pair2) {
    console.log(ex1, ex2, pair1, pair2);
    setInputs1({ exchange: ex1, pair: pair1 });
    setInputs2({ exchange: ex2, pair: pair2 });
  }
  function onSetMarketInfo() {}

  //make a post request with the current state
  async function onStartNewTracker() {
    console.log('Starting new value with the following values: ');
    console.log(inputs1, inputs2, frequency);
    let data = await ts.createTracker(
      inputs1.exchange,
      inputs2.exchange,
      inputs1.pair,
      frequency
    );
    console.log('Table created with id: ' + data.id);
    alert(
      `A new tracker was created with the id: ${data.id}. To make sure it is running properly, please refresh the page and confirm its "error" field is empty.`
    );
  }

  return (
    <div className="tracker-creator">
      <CemmInput onChange={handleMarketInfoChange}></CemmInput>
      <div className="frequency-picker">
        <label htmlFor="name">Frequency(seconds):</label>
        <input
          type="text"
          name="frequency"
          id="frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          placeholder="10"
        ></input>
      </div>
      <Button
        className="create-tracker-btn"
        variant="success"
        onClick={onStartNewTracker}
      >
        Start New Tracker
      </Button>
    </div>
  );
}
