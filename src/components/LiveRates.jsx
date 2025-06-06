import { useEffect } from 'react';

export default function LiveRates() {
  useEffect(() => {
    fetch("https://apli-apl-6795.mtndatasales.workers.dev/api/latest-rates")
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) {
          for (const [code, { buy, sell }] of Object.entries(json.data)) {
            const base = code.split("_")[0].toLowerCase(); // "usd", "eur", etc.
            const buyEl = document.getElementById(`${base}buy`);
            const sellEl = document.getElementById(`${base}sell`);
            if (buyEl) buyEl.textContent = `₦${buy}`;
            if (sellEl) sellEl.textContent = `₦${sell}`;
          }
        }
      });
  }, []);

  return null; // no visible output
}
