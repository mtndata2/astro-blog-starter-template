export const prerender = false;
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  const kv = locals.runtime.env.CURRENCY_KV_ASTRO;

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
};
