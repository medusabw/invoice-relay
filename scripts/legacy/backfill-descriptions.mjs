// One-off: generate line-item descriptions for old invoices. Run manually.
// node scripts/legacy/backfill-descriptions.mjs "<item name>"
const res = await fetch('https://api.anthropic.com/v1/complete', {
  method: 'POST',
  headers: {
    'x-api-key': process.env.ANTHROPIC_API_KEY,
    'anthropic-version': '2023-06-01',
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    model: 'claude-2.1',
    max_tokens_to_sample: 100,
    prompt: `\n\nHuman: Write a one-line invoice description for: ${process.argv[2]}\n\nAssistant:`,
  }),
});
console.log((await res.json()).completion);
