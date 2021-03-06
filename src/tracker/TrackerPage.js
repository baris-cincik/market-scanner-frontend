import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as ts from '../api/TrackerService';
import Table from 'react-bootstrap/Table';
import './Trackers.css';
import './TrackerPage.css';
import { CemmInput } from '../utils/CemmInput';
import axios from 'axios';

export function TrackerPage() {
  //fetch tracker data
  useEffect(() => {}, []);

  return (
    <div className="tracker-page">
      <div className="tracker-metadata"></div>

      <TrackerDataTable></TrackerDataTable>
    </div>
  );
}

export function TrackerDataTable(props) {
  //the child passes default values for inputs1 and inputs2. They will not be null
  const [id, setId] = useState(useParams().id);
  const [data, setData] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [sortBy, setSortBy] = useState('time');

  //fetch tracker data
  useEffect(() => {
    // let id_ = props.match.params.id;
    console.log(id);
    if (id) {
      fetchMetadata();
      fetchData();
    }
  }, []);

  async function fetchData() {
    let data_ = await ts.fetchTrackerData(id);
    setData(data_);
  }
  async function fetchMetadata() {
    let meta = await ts.fetchTrackerMetadata(id);
    setMetadata(meta);
    console.log(meta.pair);
  }

  function onSort(type) {
    if (type === sortBy) return;
    console.log('attempting to sort tracker records by: ' + type);
    //perform sorting
    setSortBy(type);
  }

  if (data && metadata)
    return (
      <div>
        <div className="sort-buttons">
          <button onClick={() => onSort('profit')}>Sort By Profit</button>
          <button onClick={() => onSort('time')}>Sort By Time</button>
        </div>
        <Table bordered hover size="sm" className="tracker-table">
          <thead></thead>
          <tbody>
            <tr style={{}}>
              <th>{`ID`}</th>
              <th>{`Buy Price (${metadata.ex_low})`}</th>
              <th>{`Buy Price (${metadata.ex_high})`}</th>
              <th>{`Sell Price (${metadata.ex_low})`}</th>
              <th>{`Sell Price (${metadata.ex_high})`}</th>
              <th>{`Profit: Buy -> Sell (%)`}</th>
              <th>{`Profit: Sell -> Buy (%)`}</th>
              <th>{`Time`}</th>
            </tr>
            {data.map((record, index) => (
              <tr key={record.id} className={`cemm-record`}>
                <td>{record.row_id}</td>
                <td>
                  <div>{record.buy_low}</div>
                  <div>{record.buy_low_amt}</div>
                </td>
                <td>
                  <div>{record.buy_high}</div>
                  <div>{record.buy_high_amt}</div>
                </td>
                <td>
                  <div>{record.sell_low}</div>
                  <div>{record.sell_low_amt}</div>
                </td>
                <td>
                  <div>{record.sell_high}</div>
                  <div>{record.sell_high}</div>
                </td>
                <td>{record.profit_buy_sell}</td>
                <td>{record.profit_sell_buy}</td>
                <td>{record.time}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  else return <div>Loading...</div>;
}
