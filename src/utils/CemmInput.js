import '../scanner/Cemm.css';
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { EXCHANGES, PAIRS, BACKEND_URL } from './MyConstants';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import {
  fetchPairs,
  fetchExchanges,
  fetchOrderBook,
  fetchRecentTrades,
} from '../api/MarketService';
import { OrderTable, TradesTable } from '../scanner/CEMMDisplay';

export function CemmInput(props) {
  const [ex1, setEx1] = useState('btcturk');
  const [pairList1, setPairList1] = useState(['loading...']);
  const [pair1, setPair1] = useState('BTC/USDT');
  const [ex2, setEx2] = useState('binance');
  const [pairList2, setPairList2] = useState(['loading...']);
  const [pair2, setPair2] = useState('BTC/USDT');
  //the actual props that will be sent
  const [inputs1, setInputs1] = useState({
    exchange: null,
    pair: null,
  });
  const [inputs2, setInputs2] = useState({
    exchange: null,
    pair: null,
  });
  const [types, setTypes] = useState(['low', 'high']);
  //fetched from backend
  const [exchangeList, setExchangeList] = useState(['binance']);

  //fetch exchange list
  useEffect(() => {
    fetchExchanges_();
    //fetch pairs for the default exchanges
    fetchPairs_(ex1, 'low');
    fetchPairs_(ex2, 'high');
    //show an initial default table
    //handleRefresh();
  }, []);

  //whenever there is a change with the state, trigger onChange to pass the state to parent
  useEffect(() => {
    props.onChange(ex1, ex2, pair1, pair2);
  }, [ex1, ex2, pair1, pair2]);

  //sets the new values with respect to dropdown
  async function handleExcDropdown(e, type) {
    console.log(e);
    if (type === 'low') {
      setEx1(e);
      fetchPairs_(e, 'low');
    } else if (type === 'high') {
      setEx2(e);
      fetchPairs_(e, 'high');
    }
  }

  //fetches pairs for the given exc and sets to the appropriate pair variable
  async function fetchPairs_(exc, type) {
    let pairs = await fetchPairs(exc, type);
    if (pairs === null) return;
    if (type === 'low') setPairList1(pairs);
    else if (type === 'high') setPairList2(pairs);
  }

  async function fetchExchanges_() {
    let exchanges = await fetchExchanges();
    if (exchanges === null) return;
    setExchangeList(exchanges);
  }

  //DEPRECATED. Submit is now done on the parent component
  //returns the ExchangeInfo widget with updated props
  async function onSubmit() {
    if (pair1 === '' || pair2 === '') {
      alert('Please fill out the pair section.');
      return null;
    }
    console.log(`${ex1}:${pair1} ${ex2}:${pair2}`);
    props.onSubmit(ex1, pair1, ex2, pair2);

    // setInputs1({ exchange: ex1, pair: pair1 });
    // setInputs2({ exchange: ex2, pair: pair2 });
  }
  return (
    <div className="cemm">
      <div className="options">
        {types.map((type) => (
          <div className="two-dropdowns" key={type}>
            <label htmlFor="name">{`Pick ${type} liquidity exchange`}:</label>
            <DropdownButton
              className="exchange-dropdown"
              id="dropdown-basic-button"
              title={type === 'low' ? ex1 : ex2}
              onSelect={(e) => handleExcDropdown(e, type)}
            >
              {exchangeList.map((exchange) => (
                <Dropdown.Item eventKey={exchange} key={exchange}>
                  {exchange}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <label htmlFor="name">{`List of pairs`}:</label>
            <DropdownButton
              className="pair-dropdown"
              id="dropdown-basic-button"
              title="pairs"
              onSelect={(e) => null}
            >
              {getPairList(type).map((pair) => (
                <Dropdown.Item eventKey={pair} key={pair}>
                  {pair}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <form>
              <div className="form-group">
                <label htmlFor="name">Input a pair:</label>
                {type == 'low' ? (
                  <input
                    type="text"
                    name="pair1"
                    id="pair1"
                    value={pair1}
                    onChange={(e) => setPair1(e.target.value)}
                    placeholder="BTC/USDT"
                  ></input>
                ) : (
                  <input
                    type="text"
                    name="pair2"
                    id="pair2"
                    value={pair2}
                    onChange={(e) => setPair2(e.target.value)}
                    placeholder="BTC/USDT"
                  ></input>
                )}
              </div>
            </form>
          </div>
        ))}
      </div>
      {/** <Button variant="success" onClick={onSubmit}>
        {props.btnTitle}
      </Button>{' '}*/}
    </div>
  );

  function getPairList(type) {
    if (type === 'low') return pairList1;
    else if (type === 'high') return pairList2;
  }
}
