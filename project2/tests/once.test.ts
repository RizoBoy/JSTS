import { describe, it, expect, jest } from '@jest/globals';
import { once } from '../src/utils/once';

describe('once', () => {
  it('should call function only once', () => {
    const mockFn = jest.fn(() => 'result');
    const onceFn = once(mockFn);

    expect(onceFn()).toBe('result');
    expect(onceFn()).toBe('result');
    expect(onceFn()).toBe('result');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should pass arguments on first call', () => {
    const mockFn = jest.fn((x: number, y: number) => x + y);
    const onceFn = once(mockFn);

    expect(onceFn(1, 2)).toBe(3);
    expect(onceFn(3, 4)).toBe(3); // Should return cached result
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith(1, 2);
  });
});