import React, { useEffect, useState } from "react";

const pairs = [
  { code: "USD_NGN", label: "USD/NGN" },
  { code: "EUR_NGN", label: "EUR/NGN" },
  { code: "GBP_NGN", label: "GBP/NGN" },
  { code: "CAD_NGN", label: "CAD/NGN" },
  { code: "ZAR_NGN", label: "ZAR/NGN" },
  { code: "AUD_NGN", label: "AUD/NGN" },
  { code: "AED_NGN", label: "AED/NGN" },
  { code: "CNY_NGN", label: "CNY/NGN" },
  { code: "GHS_NGN", label: "GHS/NGN" },
  { code: "XOF_NGN", label: "XOF/NGN" },
  { code: "XAF_NGN", label: "XAF/NGN" },
];

export default function RatesTable() {
  const [rates, setRates] = useState({});

  useEffect(() => {
    fetch('/api/latest-rates')
      .then(res => res.json())
      .then(data => setRates(data));
  }, []);

  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Currency</th>
          <th>Buy Rate</th>
          <th>Sell Rate</th>
        </tr>
      </thead>
      <tbody>
        {pairs.map(pair => (
          <tr key={pair.code}>
            <td>{pair.label}</td>
            <td>{rates[pair.code]?.buy ?? 'N/A'}</td>
            <td>{rates[pair.code]?.sell ?? 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
