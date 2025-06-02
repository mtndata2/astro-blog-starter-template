import React, { useEffect, useState } from "react";

export default function CurrencyHistory({ pair, label }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/${pair.toLowerCase()}-history`)
      .then(res => res.json())
      .then(data => {
        setHistory(data || []);
        setLoading(false);
      });
  }, [pair]);

  if (loading) return <div>Loading chart...</div>;

  if (!history.length) return <div>No data available.</div>;

  // Get high/low for 30 days
  const high = Math.max(...history.map(d => d.sell || 0));
  const low = Math.min(...history.map(d => (d.sell === null ? Infinity : d.sell)));

  // Table for last 7 days (most recent at top)
  const last7 = [...history].reverse().slice(0, 7);

  return (
    <div style={{ margin: "2em 0" }}>
      <h3>{label} - 30 Days Trend</h3>
      {/* Simple SVG line graph */}
      <svg width="100%" height="120" viewBox="0 0 300 100" style={{ background: "#fff", borderRadius: 8 }}>
        {history.length > 1 && (
          <polyline
            fill="none"
            stroke="#166a39"
            strokeWidth="2"
            points={
              history
                .map((d, i) => {
                  const x = (i / (history.length - 1)) * 300;
                  const y =
                    100 - ((d.sell - low) / (high - low || 1)) * 90;
                  return `${x},${y}`;
                })
                .join(" ")
            }
          />
        )}
      </svg>
      <div style={{ margin: "1em 0" }}>
        <b>30-Day High:</b> ₦{high} &nbsp;&nbsp; <b>Low:</b> ₦{low}
      </div>
      <h4>Last 7 Days Sell Rate</h4>
      <table style={{ width: "100%", background: "#fafafa" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Buy</th>
            <th>Sell</th>
          </tr>
        </thead>
        <tbody>
          {last7.map((row, i) => (
            <tr key={i}>
              <td>{row.date}</td>
              <td>{row.buy ?? "N/A"}</td>
              <td>{row.sell ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
