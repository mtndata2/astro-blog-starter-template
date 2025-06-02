import React from "react";

export default function UsdNgnTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Buy</th>
          <th>Sell</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.date}>
            <td>{row.date}</td>
            <td>₦{row.buy}</td>
            <td>₦{row.sell}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
