import { anthropic } from './client.js';

export async function summarizeInvoice(lines: string[]): Promise<string> {
  const msg = await anthropic.messages.create({
    model: 'claude-haiku-5-5',
    max_tokens: 300,
    system: 'You write one-paragraph, plain-language summaries of invoices for small-business customers.',
    messages: [{ role: 'user', content: lines.join('\n') }],
  });
  const block = msg.content[0];
  return block.type === 'text' ? block.text : '';
}
