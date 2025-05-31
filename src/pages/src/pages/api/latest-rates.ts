import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  const kv = locals.runtime.env.CURRENCY_KV;

  const usd = await kv.get('USD_NGN', 'json');
  const eur = await kv.get('EUR_NGN', 'json');
  const gbp = await kv.get('GBP_NGN', 'json');

  return new Response(
    JSON.stringify({ USD_NGN: usd, EUR_NGN: eur, GBP_NGN: gbp }),
    { headers: { 'Content-Type': 'application/json' } }
  );
};
