import { describe, it, expect } from '@jest/globals';
import { isEqual } from '../src/utils/isEqual';

describe('isEqual', () => {
    it('should return true for identical primitives', () => {
        expect(isEqual(1, 1)).toBe(true);
        expect(isEqual('hello', 'hello')).toBe(true);
        expect(isEqual(true, true)).toBe(true);
        expect(isEqual(null, null)).toBe(true);
        expect(isEqual(undefined, undefined)).toBe(true);
    });

    it('should return false for different primitives', () => {
        expect(isEqual(1, 2)).toBe(false);
        expect(isEqual('hello', 'world')).toBe(false);
        expect(isEqual(true, false)).toBe(false);
    });

    it('should compare arrays', () => {
        expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
        expect(isEqual([1, 2], [1, 2, 3])).toBe(false);
        expect(isEqual([1, 2, 3], [1, 3, 2])).toBe(false);
    });

    it('should compare objects', () => {
        expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
        expect(isEqual({ a: 1, b: 2 }, { a: 1, c: 2 })).toBe(false);
        expect(isEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
    });

    it('should handle nested structures', () => {
        const obj1 = { a: [1, 2], b: { c: 3 } };
        const obj2 = { a: [1, 2], b: { c: 3 } };
        const obj3 = { a: [1, 2], b: { c: 4 } };
        expect(isEqual(obj1, obj2)).toBe(true);
        expect(isEqual(obj1, obj3)).toBe(false);
    });
});
