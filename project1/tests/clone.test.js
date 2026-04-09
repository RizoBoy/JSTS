import assert from 'assert';
import { clone } from '../src/utils/clone.js';

describe('clone', () => {
  test('should clone primitive values', () => {
    assert.strictEqual(clone(42), 42);
    assert.strictEqual(clone('hello'), 'hello');
    assert.strictEqual(clone(true), true);
    assert.strictEqual(clone(null), null);
    assert.strictEqual(clone(undefined), undefined);
  });

  test('should clone arrays', () => {
    const original = [1, 2, 3];
    const cloned = clone(original);
    
    assert.deepStrictEqual(cloned, original);
    assert.notStrictEqual(cloned, original);
  });

  test('should clone nested arrays', () => {
    const original = [1, [2, 3], [4, [5, 6]]];
    const cloned = clone(original);
    
    assert.deepStrictEqual(cloned, original);
    assert.notStrictEqual(cloned, original);
    assert.notStrictEqual(cloned[1], original[1]);
    assert.notStrictEqual(cloned[2], original[2]);
    assert.notStrictEqual(cloned[2][1], original[2][1]);
  });

  test('should clone objects', () => {
    const original = { a: 1, b: 2, c: 3 };
    const cloned = clone(original);
    
    assert.deepStrictEqual(cloned, original);
    assert.notStrictEqual(cloned, original);
  });

  test('should clone nested objects', () => {
    const original = { a: 1, b: { c: 2, d: { e: 3 } } };
    const cloned = clone(original);
    
    assert.deepStrictEqual(cloned, original);
    assert.notStrictEqual(cloned, original);
    assert.notStrictEqual(cloned.b, original.b);
    assert.notStrictEqual(cloned.b.d, original.b.d);
  });

  test('should clone mixed object and array structures', () => {
    const original = {
      name: 'Test',
      items: [1, 2, { nested: true }],
      config: { enabled: true, values: [1, 2, 3] }
    };
    const cloned = clone(original);
    
    assert.deepStrictEqual(cloned, original);
    assert.notStrictEqual(cloned, original);
    assert.notStrictEqual(cloned.items, original.items);
    assert.notStrictEqual(cloned.items[2], original.items[2]);
    assert.notStrictEqual(cloned.config, original.config);
  });

  test('should create independent clones', () => {
    const original = { a: { b: 1 } };
    const cloned = clone(original);
    
    cloned.a.b = 99;
    
    assert.strictEqual(original.a.b, 1);
    assert.strictEqual(cloned.a.b, 99);
  });

  test('should handle empty arrays and objects', () => {
    assert.deepStrictEqual(clone([]), []);
    assert.deepStrictEqual(clone({}), {});
  });

  test('should handle arrays with mixed types', () => {
    const original = [1, 'string', true, null, { key: 'value' }, [1, 2]];
    const cloned = clone(original);
    
    assert.deepStrictEqual(cloned, original);
    assert.notStrictEqual(cloned, original);
    assert.notStrictEqual(cloned[4], original[4]);
    assert.notStrictEqual(cloned[5], original[5]);
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
