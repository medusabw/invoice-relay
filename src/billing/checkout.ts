import { stripe } from '../lib/stripe.js';

export async function createCheckout(customerId: string, priceId: string, quantity = 1) {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer: customerId,
    line_items: [{ price: priceId, quantity }],
    success_url: 'https://example.com/paid?session={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://example.com/cancelled',
    automatic_tax: { enabled: true },
  });
  return { id: session.id, url: session.url };
}

export async function createInvoiceLink(priceId: string) {
  const link = await stripe.paymentLinks.create({
    line_items: [{ price: priceId, quantity: 1 }],
    after_completion: { type: 'redirect', redirect: { url: 'https://example.com/thanks' } },
  });
  return link.url;
}
