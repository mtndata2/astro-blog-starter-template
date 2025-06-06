import { useEffect, useState } from 'react';

const CURRENCIES = [
  { code: "USD_NGN", label: "Dollar", flag: "🇺🇸", name: "USD" },
  { code: "GBP_NGN", label: "Pound", flag: "🇬🇧", name: "GBP" },
  { code: "EUR_NGN", label: "Euro", flag: "🇪🇺", name: "EUR" },
  { code: "CAD_NGN", label: "Canadian Dollar", flag: "🇨🇦", name: "CAD" },
  { code: "ZAR_NGN", label: "Rand", flag: "🇿🇦", name: "ZAR" },
  { code: "AUD_NGN", label: "Aussie", flag: "🇦🇺", name: "AUD" },
  { code: "AED_NGN", label: "Dirham", flag: "🇦🇪", name: "AED" },
  { code: "CNY_NGN", label: "Yuan", flag: "🇨🇳", name: "CNY" },
  { code: "GHS_NGN", label: "Cedi", flag: "🇬🇭", name: "GHS" },
  { code: "XOF_NGN", label: "XOF", flag: "🌍", name: "XOF" },
  { code: "XAF_NGN", label: "XAF", flag: "🌍", name: "XAF" },
];

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
    <div className="live-rate-box" style={{ maxWidth: "720px", margin: "2em auto", padding: "1em", background: "#f8fff6", borderRadius: "10px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1em" }}>Live Currency Rates</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#e6f4ea" }}>
            <th style={{ padding: "8px" }}>Currency</th>
            <th style={{ padding: "8px" }}>Buy</th>
            <th style={{ padding: "8px" }}>Sell</th>
          </tr>
        </thead>
        <tbody>
          {CURRENCIES.map(({ code, label, flag, name }) => {
            const data = rates[code] || {};
            return (
              <tr key={code} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "8px" }}>{flag} {label} ({name})</td>
                <td style={{ padding: "8px" }}>₦{typeof data.buy === "number" ? data.buy : "N/A"}</td>
                <td style={{ padding: "8px" }}>₦{typeof data.sell === "number" ? data.sell : "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
