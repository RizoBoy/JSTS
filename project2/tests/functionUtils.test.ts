import { describe, it, expect } from '@jest/globals';
import { pipe, compose } from '../src/utils/functionUtils';

describe('pipe', () => {
  it('should compose functions from left to right', () => {
    const add = (x: number) => x + 1;
    const multiply = (x: number) => x * 2;
    const piped = pipe(add, multiply);

    expect(piped(3)).toBe(8); // (3 + 1) * 2 = 8
  });

  it('should work with single function', () => {
    const add = (x: number) => x + 1;
    const piped = pipe(add);

    expect(piped(5)).toBe(6);
  });
});

describe('compose', () => {
  it('should compose functions from right to left', () => {
    const add = (x: number) => x + 1;
    const multiply = (x: number) => x * 2;
    const composed = compose(multiply, add);

    expect(composed(3)).toBe(8); // (3 + 1) * 2 = 8
  });

  it('should work with single function', () => {
    const add = (x: number) => x + 1;
    const composed = compose(add);

    expect(composed(5)).toBe(6);
  });
});