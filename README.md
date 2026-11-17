# invoice-relay

Small invoicing backend. It creates Stripe Checkout sessions and payment links, handles
disputes and webhooks, and uses Claude to write plain-language invoice summaries.

```
npm install
STRIPE_SECRET_KEY=sk_test_... ANTHROPIC_API_KEY=... npm run build && npm start
```
