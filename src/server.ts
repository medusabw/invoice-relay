import express from 'express';
import { createCheckout } from './billing/checkout.js';
import { listOpenInvoices } from './billing/invoices.js';
import { handleStripeWebhook } from './webhooks/stripe.js';
import { summarizeInvoice } from './ai/summarize.js';

const app = express();
app.post('/webhooks/stripe', express.raw({ type: 'application/json' }), handleStripeWebhook);
app.use(express.json());

app.post('/checkout', async (req, res) => {
  res.json(await createCheckout(req.body.customerId, req.body.priceId, req.body.quantity));
});

app.get('/customers/:id/invoices', async (req, res) => {
  const invoices = await listOpenInvoices(req.params.id);
  const summary = await summarizeInvoice(invoices.map((i) => `${i.number}: ${i.amountDue} ${i.currency}`));
  res.json({ invoices, summary });
});

app.listen(Number(process.env.PORT ?? 3000));
