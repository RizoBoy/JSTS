import { describe, it, expect, jest } from '@jest/globals';
import { memoize } from '../src/utils/memoize';

describe('memoize', () => {
  it('should cache function results', () => {
    const mockFn = jest.fn((x: number) => x * 2);
    const memoizedFn = memoize(mockFn);

    expect(memoizedFn(5)).toBe(10);
    expect(memoizedFn(5)).toBe(10);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should handle different arguments separately', () => {
    const mockFn = jest.fn((x: number, y: number) => x + y);
    const memoizedFn = memoize(mockFn);

    expect(memoizedFn(1, 2)).toBe(3);
    expect(memoizedFn(2, 3)).toBe(5);
    expect(memoizedFn(1, 2)).toBe(3);
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should handle complex objects as arguments', () => {
    const mockFn = jest.fn((obj: { a: number }) => obj.a * 2);
    const memoizedFn = memoize(mockFn);

    const obj1 = { a: 1 };
    const obj2 = { a: 2 };

    expect(memoizedFn(obj1)).toBe(2);
    expect(memoizedFn(obj2)).toBe(4);
    expect(memoizedFn(obj1)).toBe(2);
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});