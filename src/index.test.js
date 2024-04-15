import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { toHexString } from './index.js';

describe('toHexString', () => {

    test('should convert an empty buffer to a hexadecimal string', () => {
        // Test case 1: Empty buffer
        const buffer1 = Buffer.from([]);
        assert.strictEqual(toHexString(buffer1), "");
    });

    test('should convert a buffer with a single byte to a hexadecimal string', () => {
        // Test case 2: Buffer with single byte
        const buffer2 = Buffer.from([255]);
        assert.strictEqual(toHexString(buffer2), "ff");
    });

    test('should convert a buffer with multiple bytes to a hexadecimal string', () => {
        // Test case 3: Buffer with multiple bytes
        const buffer3 = Buffer.from([10, 20, 30, 40]);
        assert.strictEqual(toHexString(buffer3), "0a141e28");
    });

    test('should convert a buffer to a hexadecimal string with leading zeros', () => {
        // Test case 4: Buffer with leading zeros
        const buffer4 = Buffer.from([0, 1, 2, 3]);
        assert.strictEqual(toHexString(buffer4), "00010203");
    });
});
