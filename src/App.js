import './App.css';
import { Cemm } from './scanner/Scanner';
//this is required for the styling of your bootstrap elements
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MyNavbar } from './navbar';
import { TrackersPage } from './tracker/TrackersPage';
import { TrackerPage } from './tracker/TrackerPage';

//Router has changed in v6. You use "Routes" instead of "Switch" and "element" instead of "component"
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {}, []);

  return (
    <div className="App">
      <MyNavbar></MyNavbar>
      <Router>
        {/*<Navbar></Navbar>*/}
        <Routes>
          <Route path="/" element={<TrackersPage />}></Route>
          <Route path="/cemm" element={<Cemm />}></Route>
          <Route path="/trackers" element={<TrackersPage />}></Route>
          <Route path="/tracker/:id" element={<TrackerPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
