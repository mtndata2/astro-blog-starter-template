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

    const result: Record<string, any> = {};
    for (const pair of pairs) {
      const rate = await kv.get(`${pair}_TODAY`, 'json');
      result[pair] = rate ?? null;
    }

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
