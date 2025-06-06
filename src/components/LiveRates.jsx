import { useEffect } from "react";

export default function LiveRates() {
  useEffect(() => {
    const updateRates = async () => {
      try {
        const res = await fetch("https://apli-apl-6795.mtndatasales.workers.dev/api/latest-rates");
        const json = await res.json();

        if (json.success && json.data?.USD_NGN) {
          const { buy, sell } = json.data.USD_NGN;

          const buyEl = document.getElementById("usdbuy");
          const sellEl = document.getElementById("usdsell");

          if (buyEl) buyEl.textContent = `₦${buy}`;
          if (sellEl) sellEl.textContent = `₦${sell}`;
        } else {
          console.warn("No USD_NGN data returned from API");
        }
      } catch (err) {
        console.error("LiveRates fetch failed:", err);
      }
    };

    if (document.readyState === "complete") {
      updateRates();
    } else {
      window.addEventListener("DOMContentLoaded", updateRates);
    }
  }, []);

  return null;
}
