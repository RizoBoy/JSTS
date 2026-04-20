import { describe, it, expect } from '@jest/globals';
import { groupBy } from '../src/utils/groupBy';

describe('groupBy', () => {
  it('should group objects by string key', () => {
    const data = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
      { name: 'Charlie', age: 25 },
    ];

    const result = groupBy(data, 'age');
    expect(result).toEqual({
      '25': [
        { name: 'Alice', age: 25 },
        { name: 'Charlie', age: 25 },
      ],
      '30': [{ name: 'Bob', age: 30 }],
    });
  });

  it('should group objects by number key', () => {
    const data = [
      { id: 1, category: 'A' },
      { id: 2, category: 'B' },
      { id: 3, category: 'A' },
    ];

    const result = groupBy(data, 'category');
    expect(result).toEqual({
      A: [
        { id: 1, category: 'A' },
        { id: 3, category: 'A' },
      ],
      B: [{ id: 2, category: 'B' }],
    });
  });

  it('should handle empty array', () => {
    const result = groupBy([], 'key');
    expect(result).toEqual({});
  });
});