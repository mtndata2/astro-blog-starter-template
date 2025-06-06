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

  const usd = rates.USD_NGN || {};
  
  return (
    <div class="live-rate-box">
      <p>Live USD Buy: ₦{usd.buy ?? 'N/A'}</p>
      <p>Live USD Sell: ₦{usd.sell ?? 'N/A'}</p>
    </div>
  );
}
