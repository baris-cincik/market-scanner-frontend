import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { TradeAnalyzerPage } from './analyzer/TradeAnalyzerPage';

export function MyNavbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {}, []);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">CEMM PRO</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/cemm">Scanner</Nav.Link>
          <Nav.Link href="/trackers">Tracker</Nav.Link>
          <Nav.Link href="/perpetual">Perpetual</Nav.Link>
          <Nav.Link href="/arbitrage">Arbitrage</Nav.Link>
          <Nav.Link href="/analyze-trades">Trade Analysis</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
