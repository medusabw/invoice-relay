import Stripe from 'stripe';
import { stripe } from '../lib/stripe.js';

export type DisputeStage = 'open' | 'waiting' | 'won' | 'lost' | 'closed';

export function stageFor(dispute: Stripe.Dispute): DisputeStage {
  switch (dispute.status) {
    case 'needs_response':
    case 'warning_needs_response':
      return 'open';
    case 'under_review':
    case 'warning_under_review':
      return 'waiting';
    case 'won':
      return 'won';
    case 'lost':
      return 'lost';
    case 'warning_closed':
    case 'prevented':
      return 'closed';
    default:
      throw new Error(`unhandled dispute status: ${dispute.status}`);
  }
}

export async function submitEvidence(disputeId: string, invoicePdfFileId: string, note: string) {
  return stripe.disputes.update(disputeId, {
    evidence: {
      uncategorized_file: invoicePdfFileId,
      uncategorized_text: note,
    },
    submit: true,
  });
}
