import Anthropic from '@anthropic-ai/sdk';
import { anthropic } from './client.js';

// Payment-reminder copy. Written before we moved summaries to the chat API.
export async function reminderText(customerName: string, daysOverdue: number): Promise<string> {
  const res = await anthropic.completions.create({
    model: 'claude-2.1',
    max_tokens_to_sample: 200,
    prompt: `${Anthropic.HUMAN_PROMPT} Write a short, friendly payment reminder for ${customerName}, whose invoice is ${daysOverdue} days overdue.${Anthropic.AI_PROMPT}`,
  });
  return res.completion.trim();
}
