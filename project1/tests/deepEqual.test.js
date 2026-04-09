import assert from 'assert';
import { deepEqual } from '../src/utils/deepEqual.js';

describe('deepEqual', () => {
  test('1', () => {
    assert.strictEqual(deepEqual(5, 5), true);
    assert.strictEqual(deepEqual('hello', 'hello'), true);
    assert.strictEqual(deepEqual(true, true), true);
    assert.strictEqual(deepEqual(null, null), true);
  });

  test('2', () => {
    assert.strictEqual(deepEqual(5, 10), false);
    assert.strictEqual(deepEqual('hello', 'world'), false);
    assert.strictEqual(deepEqual(true, false), false);
  });

  test('3', () => {
    assert.strictEqual(deepEqual(5, '5'), false);
    assert.strictEqual(deepEqual(true, 1), false);
    assert.strictEqual(deepEqual(null, undefined), false);
  });

  test('4', () => {
    assert.strictEqual(deepEqual([1, 2, 3], [1, 2, 3]), true);
    assert.strictEqual(deepEqual(['a', 'b'], ['a', 'b']), true);
  });

  test('5', () => {
    assert.strictEqual(deepEqual([1, 2, 3], [1, 2, 4]), false);
    assert.strictEqual(deepEqual([1, 2], [1, 2, 3]), false);
  });

  test('6', () => {
    assert.strictEqual(deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 }), true);
    assert.strictEqual(deepEqual({ name: 'John', age: 30 }, { name: 'John', age: 30 }), true);
  });

  test('7', () => {
    assert.strictEqual(deepEqual({ a: 1, b: 2 }, { a: 1, b: 3 }), false);
    assert.strictEqual(deepEqual({ a: 1 }, { a: 1, b: 2 }), false);
  });

  test('8', () => {
    const obj1 = { a: 1, b: { c: 2, d: [3, 4] } };
    const obj2 = { a: 1, b: { c: 2, d: [3, 4] } };
    const obj3 = { a: 1, b: { c: 2, d: [3, 5] } };
    
    assert.strictEqual(deepEqual(obj1, obj2), true);
    assert.strictEqual(deepEqual(obj1, obj3), false);
  });

  test('9', () => {
    const deep1 = { a: { b: { c: { d: { e: 1 } } } } };
    const deep2 = { a: { b: { c: { d: { e: 1 } } } } };
    const deep3 = { a: { b: { c: { d: { e: 2 } } } } };
    
    assert.strictEqual(deepEqual(deep1, deep2), true);
    assert.strictEqual(deepEqual(deep1, deep3), false);
  });

  test('10', () => {
    assert.strictEqual(deepEqual({ a: 1 }, null), false);
    assert.strictEqual(deepEqual(null, { a: 1 }), false);
  });

  test('11', () => {
    assert.strictEqual(deepEqual([1, 2], null), false);
    assert.strictEqual(deepEqual(null, [1, 2]), false);
    });

  test('12', () => {
    assert.strictEqual(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 }), true);
  });

  test('13', () => {
    assert.strictEqual(deepEqual({}, {}), true);
    assert.strictEqual(deepEqual([], []), true);
  });

  test('14', () => {
    assert.strictEqual(deepEqual([1, 2, 3], { 0: 1, 1: 2, 2: 3 }), false);
    assert.strictEqual(deepEqual({ a: 1 }, [1]), false);
  });
});

function describe(name, fn) {
  console.log(`\n${name}`);
  fn();
}

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (error) {
    console.log(`✗ ${name}`);
    console.error(`${error.message}`);
  }
}
