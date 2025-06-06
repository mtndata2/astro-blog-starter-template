import { useEffect } from "react";

export default function LiveRates() {
  useEffect(() => {
    const updateRates = async () => {
      try {
        const res = await fetch("https://apli-apl-6795.mtndatasales.workers.dev/api/latest-rates");
        const json = await res.json();

        if (json.success && json.data) {
          for (const [code, { buy, sell }] of Object.entries(json.data)) {
            const prefix = code.split("_")[0].toLowerCase(); // "usd", "eur", etc.
            const buyEl = document.getElementById(`${prefix}buy`);
            const sellEl = document.getElementById(`${prefix}sell`);
            if (buyEl) buyEl.textContent = `₦${buy}`;
            if (sellEl) sellEl.textContent = `₦${sell}`;
          }
        }
      } catch (err) {
        console.error("Failed to fetch live rates:", err);
      }
    };

    // Run after DOM is available
    if (document.readyState === "complete") {
      updateRates();
    } else {
      window.addEventListener("DOMContentLoaded", updateRates);
    }
  }, []);

  return null; // No visual element
}

