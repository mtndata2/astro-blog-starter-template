import { useEffect, useState } from 'react';

export default function LiveRates() {
  const [rates, setRates] = useState({});

  useEffect(() => {
    fetch("https://apli-apl-6795.mtndatasales.workers.dev/api/latest-rates")
      .then(res => res.json())
      .then(json => {
        if (json.success) setRates(json.data);
      });
  }, []);

  return (
    <div id="live-rates" style={{ display: "none" }}>
      {Object.entries(rates).map(([code, { buy, sell }]) => {
        const short = code.split("_")[0].toLowerCase(); // e.g., "usd"
        return (
          <div key={code}>
            <span id={`${short}buy`}>{buy}</span>
            <span id={`${short}sell`}>{sell}</span>
          </div>
        );
      })}
    </div>
  );
}
