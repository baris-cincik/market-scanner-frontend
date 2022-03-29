import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './TradeAnalyzer.css';
import { analyzeTradesFile } from './AnalyzerService';
import { timeStampToEST } from '../utils/utils';

import axios from 'axios';

export function TradeAnalyzerPage() {
  const [file, setFile] = useState(null);
  const [sorted, setSorted] = useState(null);
  const [grouped, setGrouped] = useState(null);
  const [loners, setLoners] = useState(null);
  useEffect(() => {}, []);

  // On file select, from the pop up
  function onFileChange(event) {
    if (event.target.files[0] !== undefined) {
      console.log('changing file');
      setFile(event.target.files[0]);
      console.log(event.target.files[0]);
    }
  }

  // On file upload (click the upload button)
  async function onAnalyze(event) {
    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    formData.append('hummingbot_data', file, file.name);
    //make a request to backend
    let res = await analyzeTradesFile(formData);
    setSorted(res.sorted);
    setGrouped(res.grouped);
    setLoners(res.loners);
  }

  let isTradesAnalyzed = sorted !== null && grouped !== null && loners !== null;
  return (
    <div>
      <div className="file-uploader">
        <div>Upload data zip file</div>
        <div>
          <input type="file" onChange={onFileChange} />
          <button onClick={onAnalyze}>Analyze</button>
        </div>
      </div>
      {isTradesAnalyzed && (
        <div className="trade-analysis">
          <div className="matched-trades">
            <h5>Matched Trades</h5>
            <Table bordered hover size="sm" className="tracker-table">
              <thead></thead>
              <tbody>
                <tr style={{}}>
                  <th>{`${grouped[0].maker_trade.market} Trade Price (${grouped[0].maker_trade.quote_asset})`}</th>
                  <th>{`Time (EST)`}</th>
                  <th>{`${grouped[0].taker_trade.market} Trade Price (${grouped[0].maker_trade.quote_asset})`}</th>
                  <th>{`Time (EST)`}</th>
                  <th>{`Profit (%)`}</th>
                </tr>
                {grouped.map((cemm_trade, index) => (
                  <tr key={index} className={``}>
                    <td>
                      {cemm_trade.maker_trade.trade_type} at{' '}
                      {cemm_trade.maker_trade.price}
                    </td>
                    <td>
                      {timeStampToEST(
                        cemm_trade.maker_trade.timestamp
                      ).toString()}
                    </td>
                    <td>
                      {cemm_trade.taker_trade.trade_type} at{' '}
                      {cemm_trade.taker_trade.price}
                    </td>
                    <td>
                      {timeStampToEST(
                        cemm_trade.taker_trade.timestamp
                      ).toString()}
                    </td>
                    <td>{cemm_trade.profit_prct}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="unmatched-trades">
            <h5>Un-matched Trades</h5>
            <Table bordered hover size="sm" className="tracker-table">
              <thead></thead>
              <tbody>
                <tr style={{}}>
                  <th>{`Market`}</th>
                  <th>{`Trade Type & Price (${loners[0].quote_asset})`}</th>
                  <th>{`Amount (${loners[0].base_asset})`}</th>
                  <th>{`Time (EST)`}</th>
                </tr>
                {loners.map((trade, index) => (
                  <tr key={index} className={``}>
                    <td>{trade.market}</td>
                    <td>
                      {trade.trade_type} at {trade.price}
                    </td>
                    <td>{trade.amount}</td>
                    <td>{timeStampToEST(trade.timestamp).toString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="all-trades">
            <h5>All Trades</h5>
            <Table bordered hover size="sm" className="tracker-table">
              <thead></thead>
              <tbody>
                <tr style={{}}>
                  <th>{`Market`}</th>
                  <th>{`Trade Type & Price (${sorted[0].quote_asset})`}</th>
                  <th>{`Amount (${sorted[0].base_asset})`}</th>
                  <th>{`Time (EST)`}</th>
                </tr>
                {sorted.map((trade, index) => (
                  <tr key={index} className={``}>
                    <td>{trade.market}</td>
                    <td>
                      {trade.trade_type} at {trade.price}
                    </td>
                    <td>{trade.amount}</td>
                    <td>{timeStampToEST(trade.timestamp).toString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
