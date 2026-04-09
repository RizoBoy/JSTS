import assert from 'assert';
import { debounce } from '../src/utils/debounce.js';

describe('debounce', () => {
  test('should call function after delay', (done) => {
    let callCount = 0;
    const fn = debounce(() => {
      callCount++;
    }, 50);

    fn();
    assert.strictEqual(callCount, 0);

    setTimeout(() => {
      assert.strictEqual(callCount, 1);
      done();
    }, 100);
  });

  test('should only call function once when called multiple times within delay', (done) => {
    let callCount = 0;
    const fn = debounce(() => {
      callCount++;
    }, 50);

    fn();
    fn();
    fn();

    setTimeout(() => {
      assert.strictEqual(callCount, 1);
      done();
    }, 100);
  });

  test('should call function again after delay for new invocation', (done) => {
    let callCount = 0;
    const fn = debounce(() => {
      callCount++;
    }, 50);

    fn();
    setTimeout(() => fn(), 60);
    
    setTimeout(() => {
      assert.strictEqual(callCount, 2);
      done();
    }, 150);
  });

  test('should pass arguments to debounced function', (done) => {
    let result = null;
    const fn = debounce((a, b) => {
      result = a + b;
    }, 50);

    fn(5, 10);

    setTimeout(() => {
      assert.strictEqual(result, 15);
      done();
    }, 100);
  });

  test('should use default delay of 300ms', (done) => {
    let callCount = 0;
    const fn = debounce(() => {
      callCount++;
    });

    fn();
    
    setTimeout(() => {
      assert.strictEqual(callCount, 0);
    }, 100);

    setTimeout(() => {
      assert.strictEqual(callCount, 1);
      done();
    }, 350);
  });
});

function describe(name, fn) {
  console.log(`\n${name}`);
  fn();
}

function test(name, fn) {
  const isAsync = fn.length > 0;
  
  if (isAsync) {
    fn((error) => {
      if (error) {
        console.log(`  ✗ ${name}`);
        console.error(`    ${error.message}`);
      } else {
        console.log(`  ✓ ${name}`);
      }
    });
  } else {
    try {
      fn();
      console.log(`  ✓ ${name}`);
    } catch (error) {
      console.log(`  ✗ ${name}`);
      console.error(`    ${error.message}`);
    }
  }
}
