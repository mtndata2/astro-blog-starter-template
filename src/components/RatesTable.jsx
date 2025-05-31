import React, { useEffect, useState } from "react";

export default function RatesTable() {
  const [rates, setRates] = useState(null);

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
        <tr>
          <td>1 USD</td>
          <td>{rates?.USD_NGN?.buy ?? 'N/A'}</td>
          <td>{rates?.USD_NGN?.sell ?? 'N/A'}</td>
        </tr>
        <tr>
          <td>1 EUR</td>
          <td>{rates?.EUR_NGN?.buy ?? 'N/A'}</td>
          <td>{rates?.EUR_NGN?.sell ?? 'N/A'}</td>
        </tr>
        <tr>
          <td>1 GBP</td>
          <td>{rates?.GBP_NGN?.buy ?? 'N/A'}</td>
          <td>{rates?.GBP_NGN?.sell ?? 'N/A'}</td>
        </tr>
      </tbody>
    </table>
  );
}
