import './Cemm.css';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { OrderBook } from '../models/OrderBook';
import { dateDiff } from '../utils/utils';

//These classes are only for UI puposes. No fetchings/api calls made here

//SIDES ARE ACCORDING TO TAKER
export function TradesTable(props) {
  const [trades, setTrades] = useState(props.trades);
  const [symbol, setSymbol] = useState(props.trades[0].symbol);
  const [base, setBase] = useState(parseSymbol('base'));
  const [quote, setQuote] = useState(parseSymbol('quote'));

  useEffect(() => {
    if (props.trades !== trades) {
      setTrades(props.trades);
      setSymbol(props.trades[0].symbol);
      setBase(parseSymbol('base'));
      setQuote(parseSymbol('quote'));
    }
  }, [props]);

  function parseSymbol(type) {
    let arr = props.trades[0].symbol.split('/');
    if (type === 'base') return arr[0];
    else if (type === 'quote') return arr[1];
  }

  return (
    <div className="trades-table">
      <div>Past Trades</div>
      <Table bordered hover size="sm" className="table">
        <thead></thead>
        <tbody>
          <tr style={{ color: 'white' }}>
            <th>{`Price(${quote})`}</th>
            <th>{`Amount(${base})`}</th>
            <th>{`Time`}</th>
          </tr>
          {trades.map((trade, index) => (
            <tr key={index} className={`trade-row ${trade.side}`}>
              <td>{trade.price}</td>
              <td>{trade.amount}</td>
              <td>{`${dateDiff(new Date(), trade.datetime).h}h${
                dateDiff(new Date(), trade.datetime).m
              }m`}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>ATTENTION: Past trade colors might not be accurate</div>
    </div>
  );
}

export function OrderTable(props) {
  const [orderBook, setOrderBook] = useState(props.orderBook);
  const [symbol, setSymbol] = useState(props.orderBook.symbol);
  const [base, setBase] = useState(parseSymbol('base'));
  const [quote, setQuote] = useState(parseSymbol('quote'));

  useEffect(() => {
    if (props.orderBook !== orderBook) {
      setOrderBook(props.orderBook);
      setSymbol(props.orderBook.symbol);
      setBase(parseSymbol('base'));
      setQuote(parseSymbol('quote'));
    }
  }, [props]);

  function parseSymbol(type) {
    let arr = props.orderBook.symbol.split('/');
    if (type === 'base') return arr[0];
    else if (type === 'quote') return arr[1];
  }

  //you divide the spread by best ASK to get the percentage
  function getSpread() {
    let bestAsk = orderBook.asks[0][0];
    let bestBid = orderBook.bids[0][0];
    //console.log(bestAsk);
    //console.log(bestBid);
    let spread = (bestAsk - bestBid) / bestAsk;
    let prct = spread * 100;
    return prct;
  }

  return (
    <div className="order-table">
      <Table bordered hover size="sm" className="table">
        <thead></thead>
        <tbody>
          <tr style={{ color: 'white' }}>
            <th>{`Price(${quote})`}</th>
            <th>{`Amount(${base})`}</th>
            <th>{`Total Value(${quote})`}</th>
          </tr>
          {orderBook.asks
            .slice(0)
            .reverse()
            .map((order) => (
              <tr className="ask-row" key={order[0]}>
                <td>{order[0]}</td>
                <td>{order[1]}</td>
                <td>{Math.trunc(order[0] * order[1])}</td>
              </tr>
            ))}
          <tr>
            <td
              colSpan="3"
              style={{ color: 'white' }}
            >{`Spread: ${getSpread()}%`}</td>
          </tr>
          {orderBook.bids.map((order) => (
            <tr key={order[0]} className="bid-row">
              <td>{order[0]}</td>
              <td>{order[1]}</td>
              <td>{Math.trunc(order[0] * order[1])}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
