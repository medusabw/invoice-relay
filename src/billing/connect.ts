import { stripe } from '../lib/stripe.js';

export async function payoutStatus(accountId: string) {
  const account = await stripe.accounts.retrieve(accountId);
  return {
    chargesEnabled: account.charges_enabled,
    payoutsEnabled: account.payouts_enabled,
    country: account.country,
  };
}
