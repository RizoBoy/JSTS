import assert from 'assert';
import { deepEqual } from '../src/utils/deepEqual.js';

describe('deepEqual', () => {
  test('should return true for identical primitive values', () => {
    assert.strictEqual(deepEqual(5, 5), true);
    assert.strictEqual(deepEqual('hello', 'hello'), true);
    assert.strictEqual(deepEqual(true, true), true);
    assert.strictEqual(deepEqual(null, null), true);
  });

  test('should return false for different primitive values', () => {
    assert.strictEqual(deepEqual(5, 10), false);
    assert.strictEqual(deepEqual('hello', 'world'), false);
    assert.strictEqual(deepEqual(true, false), false);
  });

  test('should return false when comparing primitives of different types', () => {
    assert.strictEqual(deepEqual(5, '5'), false);
    assert.strictEqual(deepEqual(true, 1), false);
    assert.strictEqual(deepEqual(null, undefined), false);
  });

  test('should return true for identical arrays', () => {
    assert.strictEqual(deepEqual([1, 2, 3], [1, 2, 3]), true);
    assert.strictEqual(deepEqual(['a', 'b'], ['a', 'b']), true);
  });

  test('should return false for different arrays', () => {
    assert.strictEqual(deepEqual([1, 2, 3], [1, 2, 4]), false);
    assert.strictEqual(deepEqual([1, 2], [1, 2, 3]), false);
  });

  test('should return true for identical objects', () => {
    assert.strictEqual(deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 }), true);
    assert.strictEqual(deepEqual({ name: 'John', age: 30 }, { name: 'John', age: 30 }), true);
  });

  test('should return false for different objects', () => {
    assert.strictEqual(deepEqual({ a: 1, b: 2 }, { a: 1, b: 3 }), false);
    assert.strictEqual(deepEqual({ a: 1 }, { a: 1, b: 2 }), false);
  });

  test('should handle nested objects and arrays', () => {
    const obj1 = { a: 1, b: { c: 2, d: [3, 4] } };
    const obj2 = { a: 1, b: { c: 2, d: [3, 4] } };
    const obj3 = { a: 1, b: { c: 2, d: [3, 5] } };
    
    assert.strictEqual(deepEqual(obj1, obj2), true);
    assert.strictEqual(deepEqual(obj1, obj3), false);
  });

  test('should handle deeply nested structures', () => {
    const deep1 = { a: { b: { c: { d: { e: 1 } } } } };
    const deep2 = { a: { b: { c: { d: { e: 1 } } } } };
    const deep3 = { a: { b: { c: { d: { e: 2 } } } } };
    
    assert.strictEqual(deepEqual(deep1, deep2), true);
    assert.strictEqual(deepEqual(deep1, deep3), false);
  });

  test('should return false when comparing objects with null', () => {
    assert.strictEqual(deepEqual({ a: 1 }, null), false);
    assert.strictEqual(deepEqual(null, { a: 1 }), false);
  });

  test('should return false when comparing arrays with null', () => {
    assert.strictEqual(deepEqual([1, 2], null), false);
    assert.strictEqual(deepEqual(null, [1, 2]), false);
  });

  test('should return true for objects with same properties in different order', () => {
    assert.strictEqual(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 }), true);
  });

  test('should handle empty objects and arrays', () => {
    assert.strictEqual(deepEqual({}, {}), true);
    assert.strictEqual(deepEqual([], []), true);
  });

  test('should return false for mixed types', () => {
    assert.strictEqual(deepEqual([1, 2, 3], { 0: 1, 1: 2, 2: 3 }), false);
    assert.strictEqual(deepEqual({ a: 1 }, [1]), false);
  });

  test('should handle complex mixed structures', () => {
    const complex1 = {
      users: [
        { id: 1, name: 'Alice', roles: ['admin', 'user'] },
        { id: 2, name: 'Bob', roles: ['user'] }
      ],
      metadata: { total: 2, active: true }
    };
    const complex2 = {
      users: [
        { id: 1, name: 'Alice', roles: ['admin', 'user'] },
        { id: 2, name: 'Bob', roles: ['user'] }
      ],
      metadata: { total: 2, active: true }
    };
    const complex3 = {
      users: [
        { id: 1, name: 'Alice', roles: ['admin', 'user'] },
        { id: 2, name: 'Bob', roles: ['user'] }
      ],
      metadata: { total: 2, active: false }
    };
    
    assert.strictEqual(deepEqual(complex1, complex2), true);
    assert.strictEqual(deepEqual(complex1, complex3), false);
  });
});

function describe(name, fn) {
  console.log(`\n${name}`);
  fn();
}

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
  } catch (error) {
    console.log(`  ✗ ${name}`);
    console.error(`    ${error.message}`);
  }
}
