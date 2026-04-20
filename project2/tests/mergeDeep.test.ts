import { describe, it, expect } from '@jest/globals';
import { mergeDeep } from '../src/utils/mergeDeep';

describe('mergeDeep', () => {
  it('should merge shallow objects', () => {
    const a = { x: 1, y: 2 };
    const b = { y: 3, z: 4 };
    const result = mergeDeep(a, b);
    expect(result).toEqual({ x: 1, y: 3, z: 4 });
  });

  it('should merge nested objects', () => {
    const a = { nested: { a: 1, b: 2 } };
    const b = { nested: { b: 3, c: 4 } };
    const result = mergeDeep(a, b);
    expect(result).toEqual({ nested: { a: 1, b: 3, c: 4 } });
  });

  it('should not merge arrays', () => {
    const a = { arr: [1, 2] };
    const b = { arr: [3, 4] };
    const result = mergeDeep(a, b);
    expect(result).toEqual({ arr: [3, 4] });
  });

  it('should handle primitive overrides', () => {
    const a = { value: { nested: 1 } };
    const b = { value: 2 };
    const result = mergeDeep(a, b);
    expect(result).toEqual({ value: 2 });
  });
});