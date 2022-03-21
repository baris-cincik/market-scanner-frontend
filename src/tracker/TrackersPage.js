import React, { useEffect, useState } from 'react';
import * as ts from '../api/TrackerService';
import Table from 'react-bootstrap/Table';
import './Trackers.css';
import { CemmInput } from '../utils/CemmInput';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { TrackerCreator } from './TrackerCreator';

export function TrackersPage() {
  const [trackers, setTarckers] = useState([]);

  //fetch trackers
  useEffect(() => {
    fetchTrackers();
    console.log('hello');
  }, []);

  async function fetchTrackers() {
    let res = await ts.fetchAllTrackersMetadata();
    if (res !== null) {
      console.log('Tracker metadata fetched');
      setTarckers(res);
    }
    //let res = ts.testIsBackendRunning();
    //setTarckers(trackers);
  }

  async function onStopTracker(id) {
    console.log('Attempting to stop tracker: ' + id);
    let res = await ts.stopTracker(id);
    if (res === true)
      alert(
        'Tracker: ' +
          id +
          ' stopped successfully. Refresh the page to see the changes.'
      );
    else alert(res);
  }

  async function onRestartTracker(id) {
    console.log('Attempting to restart tracker: ' + id);
    let res = await ts.restartTracker(id);
    if (res === true)
      alert(
        'Tracker: ' +
          id +
          ' restarted successfully. Refresh the page to see the changes.'
      );
    else alert(res);
  }

  async function onDeleteTracker(id) {
    console.log('Attempting to delete tracker: ' + id);
    let res = await ts.deleteTracker(id);
    if (res === true)
      alert(
        'Tracker: ' +
          id +
          ' deleted successfully. Refresh the page to see the changes.'
      );
    else alert(res);
  }

  return (
    <div className="trackers-page">
      <h5 style={{ marginTop: '25px' }}>Cross Exchange Market Tracker PRO</h5>
      <TrackerCreator></TrackerCreator>
      <h5>List of Trackers</h5>
      <Table bordered hover size="sm" className="table trackers-table">
        <thead></thead>
        <tbody>
          <tr style={{ color: 'black' }}>
            <th>{'ID'}</th>
            <th>{'Low Liq Exchange'}</th>
            <th>{'High Liq Exchange'}</th>
            <th>{'Pair'}</th>
            <th>{'Frequency (sec)'}</th>
            <th>{'Status'}</th>
            <th>{'Error'}</th>
          </tr>

          {trackers.map((tracker, index) => (
            <tr key={index} className={`tracker-row`}>
              <td>
                <a href={`/tracker/${tracker.id}`} target="_blank">
                  {tracker.id}
                </a>
              </td>

              <td>{tracker.ex_low}</td>
              <td>{tracker.ex_high}</td>
              <td>{tracker.pair}</td>
              <td>{tracker.frequency}</td>
              <td
                style={{
                  color: tracker.status === 'running' ? 'green' : 'red',
                }}
              >
                {tracker.status}
              </td>
              <td>{tracker.error}</td>
              <td>
                {tracker.status === 'running' ? (
                  <button onClick={() => onStopTracker(tracker.id)}>
                    Stop
                  </button>
                ) : (
                  <button onClick={() => onRestartTracker(tracker.id)}>
                    Restart
                  </button>
                )}

                <button onClick={() => onDeleteTracker(tracker.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
