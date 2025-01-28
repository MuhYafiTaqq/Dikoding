import { test } from 'node:test';
import assert from 'node:assert';

import { sum } from './index.js';

test('test 2 + 3 apakah 5', ( () => {
    assert.strictEqual(sum(2, 3), 5);
}));