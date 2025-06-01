export const prerender = false;
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  try {
    const kv = locals.runtime.env.CURRENCY_KV_ASTRO;

    if (!kv) {
      return new Response(
        JSON.stringify({ error: 'KV binding missing' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const pairs = [
      'USD_NGN', 'EUR_NGN', 'GBP_NGN', 'CAD_NGN', 'ZAR_NGN',
      'AUD_NGN', 'AED_NGN', 'CNY_NGN', 'GHS_NGN', 'XOF_NGN', 'XAF_NGN'
    ];

    // Run all KV fetches in parallel:
    const ratePromises = pairs.map(pair => kv.get(`${pair}_TODAY`, 'json'));
    const rates = await Promise.all(ratePromises);

    const result: Record<string, any> = {};
    pairs.forEach((pair, i) => {
      result[pair] = rates[i] ?? null;
    });

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : String(e) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
