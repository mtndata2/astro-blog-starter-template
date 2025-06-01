import type { APIRoute } from "astro";
export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  try {
    const kv = locals.runtime.env.CURRENCY_KV_ASTRO;
    if (!kv) {
      return new Response(
        JSON.stringify({ error: "KV binding missing" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    const codes = [
      "USD_NGN", "GBP_NGN", "EUR_NGN", "CAD_NGN", "ZAR_NGN", "AUD_NGN",
      "AED_NGN", "CNY_NGN", "GHS_NGN", "XOF_NGN", "XAF_NGN",
    ];
    let rates: Record<string, any> = {};
    for (const code of codes) {
      rates[code] = await kv.get(`${code}_TODAY`, "json");
    }
    return new Response(JSON.stringify(rates), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : String(e) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
