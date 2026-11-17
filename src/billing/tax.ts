import { stripe } from '../lib/stripe.js';

export async function activeTaxRates() {
  const rates = await stripe.taxRates.list({ active: true, limit: 100 });
  return rates.data.map((r) => ({
    id: r.id,
    label: `${r.display_name} ${r.percentage}%`,
    inclusive: r.inclusive,
    country: r.country,
  }));
}
