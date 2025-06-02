import type { APIRoute } from 'astro';

function getLast30Dates() {
  const dates = [];
  let now = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    dates.push(d.toISOString().slice(0, 10).replace(/-/g, '')); // "20240601"
  }
  return dates;
}

export const GET: APIRoute = async ({ params, locals }) => {
  const kv = locals.runtime.env.CURRENCY_KV_ASTRO;
  if (!kv) return new Response(JSON.stringify({ error: "KV missing" }), { status: 500 });

  // Get "usd-ngn-history" and extract pair
  let { pair } = params;
  if (!pair) return new Response(JSON.stringify({ error: "No pair" }), { status: 400 });

  pair = pair.replace('-history', '').toUpperCase(); // "USD_NGN"
  if (!/^([A-Z]{3})_NGN$/.test(pair)) { // adjust as needed
    return new Response(JSON.stringify({ error: "Invalid pair" }), { status: 400 });
  }

  const dates = getLast30Dates();
  const history: {date: string, buy: number|null, sell: number|null}[] = [];
  for (const dateStr of dates.reverse()) {
    const buy = await kv.get(`${pair}_BUY_${dateStr}`);
    const sell = await kv.get(`${pair}_SELL_${dateStr}`);
    history.push({
      date: dateStr.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3"),
      buy: buy ? Number(buy) : null,
      sell: sell ? Number(sell) : null,
    });
  }

  const filtered = history.filter(day => day.buy !== null || day.sell !== null);

  return new Response(JSON.stringify(filtered), {
    headers: { "Content-Type": "application/json" }
  });
};
