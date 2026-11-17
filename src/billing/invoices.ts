import { stripe } from '../lib/stripe.js';

export async function issueInvoice(customerId: string, items: { price: string; quantity: number }[]) {
  const invoice = await stripe.invoices.create({
    customer: customerId,
    collection_method: 'send_invoice',
    days_until_due: 14,
    auto_advance: true,
  });
  for (const item of items) {
    await stripe.invoiceItems.create({ customer: customerId, invoice: invoice.id, ...item });
  }
  return stripe.invoices.finalizeInvoice(invoice.id!);
}

export async function listOpenInvoices(customerId: string) {
  const page = await stripe.invoices.list({ customer: customerId, status: 'open', limit: 20 });
  return page.data.map((inv) => ({
    id: inv.id,
    number: inv.number,
    amountDue: inv.amount_due,
    currency: inv.currency,
    dueDate: inv.due_date,
  }));
}
