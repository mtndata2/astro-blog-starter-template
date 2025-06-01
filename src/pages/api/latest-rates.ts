export const prerender = false;
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  const kv = locals.runtime.env.CURRENCY_KV_ASTRO; // This is now CURRENCY_KV_ASTRO!

  // List all currency pairs you want to display
  const pairs = [
    'USD_NGN', 'EUR_NGN', 'GBP_NGN', 'CAD_NGN', 'ZAR_NGN',
    'AUD_NGN', 'AED_NGN', 'CNY_NGN', 'GHS_NGN', 'XOF_NGN', 'XAF_NGN'
  ];

  // Build the response object with today's rates
  const result = {};
  for (const pair of pairs) {
    result[pair] = await kv.get(`${pair}_TODAY`, 'json');
  }

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' }
  });
};
