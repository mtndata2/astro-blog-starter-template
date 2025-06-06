import { useEffect, useState } from "react";

const currencyMap = {
  USD_NGN: "Dollar",
  GBP_NGN: "Pound",
  EUR_NGN: "Euro",
  CAD_NGN: "Canadian Dollar",
  ZAR_NGN: "Rand",
  AUD_NGN: "Aussie",
  AED_NGN: "Dirham",
  CNY_NGN: "Yuan",
  GHS_NGN: "Cedi",
  XOF_NGN: "XOF",
  XAF_NGN: "XAF"
};

export default function MultiHistory() {
  const [historyData, setHistoryData] = useState({});

  useEffect(() => {
    const fetchHistories = async () => {
      const results = {};
      await Promise.all(
        Object.keys(currencyMap).map(async (pair) => {
          try {
            const res = await fetch(`https://apli-apl-6795.mtndatasales.workers.dev/api/rates-history?pair=${pair}`);
            const json = await res.json();
            if (json.success) {
              results[pair] = json.history.slice(-7).reverse();
            }
          } catch (e) {
            results[pair] = [];
          }
        })
      );
      setHistoryData(results);
    };

    fetchHistories();
  }, []);

  return (
    <>
      {Object.entries(currencyMap).map(([code, label]) => {
        const history = historyData[code] || [];
        return (
          <div key={code} style={{ margin: "3em auto", maxWidth: "740px" }}>
            <h2 style={{ padding: "0 0 0.5em" }}>{label} (7-Day History)</h2>
            <table className="history-table" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Date</th><th>Buy</th><th>Sell</th>
                </tr>
              </thead>
              <tbody>
                {history.length > 0 ? (
                  history.map(day => (
                    <tr key={day.date}>
                      <td>{day.date?.slice(6,8)} {new Date(`${day.date?.slice(0,4)}-${day.date?.slice(4,6)}-${day.date?.slice(6,8)}`).toLocaleString("en-GB", { month: "short" })} {day.date?.slice(0,4)}</td>
                      <td>₦{day.buy ?? "N/A"}</td>
                      <td>₦{day.sell ?? "N/A"}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3">Loading or unavailable...</td></tr>
                )}
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
}
