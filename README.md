# Market Scanner - Crypto Arbitrage Made Easy

Simple app that makes it easier to identify arbitrage opportunities between crypto currency exchanges by pulling up the order-books and displaying profit margin.

## Live Demo:

https://peaceful-noether-64442f.netlify.app/

![alt text](https://user-images.githubusercontent.com/35776119/147883915-fc172fc2-b79a-4b6e-a718-c604b2b14a23.png)

## Backend

The backend is a simple Flask app running on Heroku. If you wish to modify it, you can find it [HERE](https://github.com/baris-cincik/market-scanner-backend):

## What is Arbitrage?

Cryptocurrency arbitrage is a strategy in which investors buy a cryptocurrency on one exchange and then quickly sell it on another exchange for a higher price, or vice versa.

## Supported Exchanges

The app supports over 112 crypto exchanges. Exchange information is pulled from CCXT. If you see a Network Error it’s probably because CCXT api had a problem making the HTTP request. Please see their [page](https://github.com/ccxt/ccxt) for exchange availabilities.

## Usage

run:
npm install
npm start

Simply pick 2 exchanges using the UI, then input a pair(ex: ETH/USDT). Hitting the refresh will bring up the order books of the pair from both exchanges, and calculate the profit you can potentially make by limit buying on one exchange, and market selling on the other (or vice versa).

NOTE: The profit percentage does NOT include trading fees.
