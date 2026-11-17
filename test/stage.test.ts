import { test } from 'node:test';
import assert from 'node:assert/strict';
import { stageFor } from '../src/billing/disputes.js';

test('won dispute maps to won', () => {
  assert.equal(stageFor({ status: 'won' } as any), 'won');
});
