export const prerender = false;
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, locals }) => {
  const pair = params.pair?.toUpperCase(); // USD_NGN, EUR_NGN, etc.
  if (!pair) {
    return new Response(JSON.stringify({ error: "Missing currency pair" }), { status: 400 });
  }

  const kv = locals.runtime.env.CURRENCY_KV_ASTRO;
  if (!kv) {
    return new Response(JSON.stringify({ error: "KV missing" }), { status: 500 });
  }

  // Pull the last 30 days
  const data: any[] = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date(Date.now() - i * 86400000)
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "");
    const rec = await kv.get(`${pair}_SELL_${date}`, "json");
    // Add logic for buy as well if you want both
    const buy = await kv.get(`${pair}_BUY_${date}`, "json");
    data.push({
      date,
      buy: buy ?? null,
      sell: rec ?? null,
    });
  }

  return new Response(JSON.stringify(data.reverse()), {
    headers: { "Content-Type": "application/json" },
  });
};
