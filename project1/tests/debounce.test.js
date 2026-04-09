import assert from 'assert';
import { debounce } from '../src/utils/debounce.js';

describe('debounce', () => {
  test('1', (done) => {
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

  test('2', (done) => {
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

  test('3', (done) => {
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

  test('4', (done) => {
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

  test('5', (done) => {
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
        console.log(`✗ ${name}`);
        console.error(`${error.message}`);
      } else {
        console.log(`✓ ${name}`);
      }
    });
  } else {
    try {
      fn();
      console.log(`✓ ${name}`);
    } catch (error) {
      console.log(`✗ ${name}`);
      console.error(`${error.message}`);
    }
  }
}
