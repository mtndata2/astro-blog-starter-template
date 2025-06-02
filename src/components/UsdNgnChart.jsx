import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function UsdNgnChart({ data }) {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }}/>
          <YAxis tick={{ fontSize: 12 }}/>
          <Tooltip />
          <Line type="monotone" dataKey="sell" stroke="#166a39" fill="#c2f7da" dot={false} />
          <Line type="monotone" dataKey="buy" stroke="#ed0c20" fill="#ffd5de" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
