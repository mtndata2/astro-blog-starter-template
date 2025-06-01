import React, { useEffect, useState } from "react";

const currencies = [
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

export default function RatesCards() {
  const [rates, setRates] = useState({});
  useEffect(() => {
    fetch('/api/latest-rates')
      .then(res => res.json())
      .then(data => setRates(data));
  }, []);

  return (
    <div className="cards-container">
      {currencies.map(({ code, label, flag, name }) => (
        <div className="currency-card" key={code}>
          <div className="flag">{flag}</div>
          <div className="label">{label} <span className="currency">{name}</span></div>
          <div className="rate-row"><b>BUY</b>: ₦{rates[code]?.buy ?? 'N/A'}</div>
          <div className="rate-row"><b>SELL</b>: ₦{rates[code]?.sell ?? 'N/A'}</div>
        </div>
      ))}
    </div>
  );
}
