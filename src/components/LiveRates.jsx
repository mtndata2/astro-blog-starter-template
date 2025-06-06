import { useEffect } from "react";

export default function LiveRates() {
  useEffect(() => {
    const updateRates = async () => {
      try {
        const res = await fetch("https://apli-apl-6795.mtndatasales.workers.dev/api/latest-rates");
        const json = await res.json();

        if (json.success && json.data) {
          Object.entries(json.data).forEach(([pair, { buy, sell }]) => {
            const prefix = pair.split("_")[0].toLowerCase(); // usd, gbp, eur, etc.

            const buyEl = document.getElementById(`${prefix}buy`);
            const sellEl = document.getElementById(`${prefix}sell`);

            if (buyEl) buyEl.textContent = `₦${buy}`;
            if (sellEl) sellEl.textContent = `₦${sell}`;
          });
        } else {
          console.warn("API returned no data");
        }
      } catch (err) {
        console.error("Failed to fetch latest rates:", err);
      }
    };

    // Wait until DOM is ready
    if (document.readyState === "complete") {
      updateRates();
    } else {
      window.addEventListener("DOMContentLoaded", updateRates);
    }
  }, []);

  return null;
}
