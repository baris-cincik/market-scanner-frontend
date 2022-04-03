import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { timeStampToEST } from './utils/utils';

export function Debug() {
  const [user, setUser] = useState(null);

  useEffect(() => {}, []);

  function onDebug() {
    console.log('debugging ...');
    let now = Date.now();
    let now2 = Math.floor(new Date().getTime() / 1000);
    let est = timeStampToEST(now2); //1648928412
    console.log(est);
  }

  return (
    <div>
      <button onClick={onDebug}>debug</button>
    </div>
  );
}
