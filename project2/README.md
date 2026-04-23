# ts-utils-pro

A TypeScript utility library showcasing advanced TypeScript features including generics, conditional types, mapped types, and more.

## Installation

```bash
npm install ts-utils-pro
```

## Usage

```typescript
import {
  deepClone,
  debounce,
  memoize,
  groupBy,
  mergeDeep,
  once,
  isEqual,
  createEventEmitter,
  pipe,
  compose
} from 'ts-utils-pro';
```

## API

### deepClone<T>(obj: T): T

Deep clones an object, preserving all nested structures.

```typescript
const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);
cloned.b.c = 3; // original.b.c is still 2
```

### debounce<F extends (...args: any[]) => any>(fn: F, delay: number): F

Debounces a function execution.

```typescript
const debouncedFn = debounce((query: string) => console.log(query), 300);
debouncedFn('search');
```

### memoize<F extends (...args: any[]) => any>(fn: F): F

Memoizes a function, caching its results.

```typescript
const expensiveFn = memoize((n: number) => n * n);
expensiveFn(5); // computed
expensiveFn(5); // cached
```

### groupBy<T>(array: T[], key: keyof T): Record<string, T[]>

Groups an array of objects by a specified key.

```typescript
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 }
];
const grouped = groupBy(users, 'age');
// { '25': [Alice, Charlie], '30': [Bob] }
```

### mergeDeep<A, B>(a: A, b: B): A & B

Deep merges two objects.

```typescript
const a = { nested: { a: 1 } };
const b = { nested: { b: 2 } };
const merged = mergeDeep(a, b);
// { nested: { a: 1, b: 2 } }
```

### once<F extends (...args: any[]) => any>(fn: F): F

Ensures a function is called only once.

```typescript
const init = once(() => console.log('Initialized'));
init(); // logs
init(); // does nothing
```

### isEqual(a: any, b: any): boolean

Deep equality check.

```typescript
isEqual({ a: [1, 2] }, { a: [1, 2] }); // true
```

### createEventEmitter<T extends string>()

Creates a typed event emitter.

```typescript
const emitter = createEventEmitter<'click' | 'hover'>();
emitter.on('click', () => console.log('clicked'));
emitter.emit('click');
```

### pipe & compose

Function composition utilities.

```typescript
const add = (x: number) => x + 1;
const multiply = (x: number) => x * 2;

const piped = pipe(add, multiply); // (x + 1) * 2
const composed = compose(multiply, add); // same as pipe
```

## Manual Utility Types

The library includes manual implementations of common TypeScript utility types:

- `MyPartial<T>`
- `MyReadonly<T>`
- `MyOmit<T, K>`
- `MyPick<T, K>`
- `MyRecord<K, T>`

## Development

```bash
npm install
npm run build
npm test
```