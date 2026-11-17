import type { Request, Response } from 'express';
import Stripe from 'stripe';
import { stripe } from '../lib/stripe.js';
import { stageFor } from '../billing/disputes.js';

export async function handleStripeWebhook(req: Request, res: Response) {
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'] as string,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return res.status(400).send('bad signature');
  }

  switch (event.type) {
    case 'checkout.session.completed':
      console.log('paid', event.data.object.id, event.data.object.payment_status);
      break;
    case 'invoice.payment_failed':
      console.log('invoice failed', event.data.object.id);
      break;
    case 'charge.dispute.created':
    case 'charge.dispute.updated':
      console.log('dispute', event.data.object.id, stageFor(event.data.object));
      break;
    default:
      // other events are ignored
      break;
  }
  res.json({ received: true });
}
