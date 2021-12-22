import './Cemm.css';
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { EXCHANGES, PAIRS, BACKEND_URL } from '../utils/MyConstants';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import {
  fetchPairs,
  fetchExchanges,
  fetchOrderBook,
  fetchRecentTrades,
} from '../api/MarketService';
import { OrderTable, TradesTable } from './CEMMDisplay';

export function Cemm() {
  const [ex1, setEx1] = useState('btcturk');
  const [pairList1, setPairList1] = useState(['loading...']);
  const [pair1, setPair1] = useState('');
  const [ex2, setEx2] = useState('binance');
  const [pairList2, setPairList2] = useState(['loading...']);
  const [pair2, setPair2] = useState('');
  //the actual props that will be send
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
  //OUTPUTS
  const [outputs, setOutputs] = useState({
    limitBuyPrice: 1,
    limitBuyAmount: 1,
    limitSellPrice: 1,
    limitSellAmount: 1,
    marketBuyPrice: 1,
    marketBuyAmount: 1,
    marketSellPrice: 1,
    marketSellAmount: 1,
  });
  const [profitStr, setProfitStr] = useState(['', '']);

  //fetch exchange list
  useEffect(() => {
    fetchExchanges_();
    //fetch pairs for the default exchanges
    fetchPairs_(ex1, 'low');
    fetchPairs_(ex2, 'high');
  }, []);

  //anytime the output changes, update the profitStr
  useEffect(() => {
    updateProfitStr();
  }, [outputs]);

  //fetch pair
  useEffect(() => {}, [ex1, ex2]);

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
    //make a call to backend
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

  //deprecated
  async function handlePairDropdown(e, type) {
    return;
    console.log(e);
    if (type === 'low') setPair1(e);
    else if (type === 'high') setPair2(e);
  }

  //returns the ExchangeInfo widget with updated props
  async function handleRefresh() {
    if (pair1 === '' || pair2 === '') {
      alert('Please fill out the pair section.');
      return null;
    }
    console.log(`${ex1}:${pair1} ${ex2}:${pair2}`);
    setInputs1({ exchange: ex1, pair: pair1 });
    setInputs2({ exchange: ex2, pair: pair2 });
  }

  //user refreshe completed and the order tables are updated. Update the outputs accordingly
  function ordersUpdated(type, bestAskP, bestAskA, bestBidP, bestBidA) {
    //console.log(type, bestAsk, bestBid);
    if (type === 'low') {
      setOutputs({
        ...outputs,
        limitBuyPrice: bestBidP,
        limitSellPrice: bestAskP,
      });
    } else if (type === 'high') {
      setOutputs({
        ...outputs,
        marketBuyPrice: bestAskP,
        marketSellPrice: bestBidP,
      });
    }
  }

  function updateProfitStr() {
    let profits = [];
    //limit buy -> market sell
    let priceDif1 = outputs.marketSellPrice - outputs.limitBuyPrice;
    let prct1 = (priceDif1 / outputs.limitBuyPrice) * 100;
    let str1 = `Limit BUY for ${outputs.limitBuyPrice}, market SELL for ${outputs.marketSellPrice}. Profit: ${prct1}%`;
    profits.push(str1);
    //limit sell -> market buy
    let priceDif2 = outputs.limitSellPrice - outputs.marketBuyPrice;
    let prct2 = (priceDif2 / outputs.marketBuyPrice) * 100;
    let str2 = `Limit SELL for ${outputs.limitSellPrice}, market BUY for ${outputs.marketBuyPrice}. Profit: ${prct2}%`;
    profits.push(str2);
    setProfitStr(profits);

    //return profits;
  }

  return (
    <div className="cemm">
      <h5 style={{ marginTop: '25px' }}>Cross Exchange Market Making PRO</h5>
      <div className="options">
        {types.map((type) => (
          <div className="two-dropdowns">
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
              onSelect={(e) => handlePairDropdown(e, type)}
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
      <Button variant="success" onClick={handleRefresh}>
        Refresh
      </Button>{' '}
      <div className="profit-labels">
        <h5>{profitStr[0]}</h5>
        <h5>{profitStr[1]}</h5>
      </div>
      <div className="market-infos">
        <MarketInfo
          inputs={inputs1}
          type="low"
          ordersUpdated={ordersUpdated}
        ></MarketInfo>
        <MarketInfo
          inputs={inputs2}
          type="high"
          ordersUpdated={ordersUpdated}
        ></MarketInfo>
      </div>
    </div>
  );

  function getPairList(type) {
    if (type === 'low') return pairList1;
    else if (type === 'high') return pairList2;
  }
}

export function MarketInfo(props) {
  const [inputs, setInputs] = useState(props.inputs);
  const [stamp, setStamp] = useState(0);
  const [orderBook, setOrderBook] = useState(null);
  const [recentTrades, setRecentTrades] = useState(null);
  const [type, setType] = useState(props.type); //low or high

  //fetch order book and history data for the given exchange/pair
  useEffect(() => {
    if (props.inputs.exchange !== null && props.inputs.pair !== null) {
      fetchOrderBook_();
      fetchRecentTrades_();
    }
  }, [inputs]);

  //update when props change
  useEffect(() => {
    if (inputs !== props.inputs) {
      console.log('props have changed');
      setInputs(props.inputs);
    }
  }, [props]);

  //when orderbook changes, notify parent to update the profit calculation
  useEffect(() => {
    if (orderBook !== null)
      props.ordersUpdated(
        type,
        orderBook.asks[0][0],
        orderBook.asks[0][1],
        orderBook.bids[0][0],
        orderBook.bids[0][1]
      );
    if (type === 'low') {
    } else if (type === 'high') {
    }
  }, [orderBook]);

  async function fetchOrderBook_() {
    console.log(`Fetching order-book for ${inputs.exchange}:${inputs.pair}`);
    let ob = await fetchOrderBook(inputs.exchange, inputs.pair);
    setOrderBook(ob);
  }

  async function fetchRecentTrades_() {
    console.log(`Fetching recent_trades for ${inputs.exchange}:${inputs.pair}`);
    let rt = await fetchRecentTrades(inputs.exchange, inputs.pair);
    setRecentTrades(rt);
  }

  if (orderBook === null || recentTrades === null)
    return <div>Please make a pick</div>;
  else
    return (
      <div className="cemm">
        <div>{`Order Book for ${inputs.exchange}:${inputs.pair}`}</div>
        <OrderTable
          orderBook={orderBook}
          key={orderBook.asks[0][0]}
        ></OrderTable>
        <TradesTable trades={recentTrades}></TradesTable>
      </div>
    );
}
