/**
 * Manual implementation of built-in TypeScript utility types
 */

// MyPartial<T> - makes all properties of T optional
export type MyPartial<T> = {
    [P in keyof T]?: T[P];
};

// MyReadonly<T> - makes all properties of T readonly
export type MyReadonly<T> = {
    readonly [P in keyof T]: T[P];
};

// MyOmit<T, K> - constructs a type by picking all properties from T and then removing K
export type MyOmit<T, K extends keyof T> = {
    [P in keyof T as P extends K ? never : P]: T[P];
};

// MyPick<T, K> - constructs a type by picking the set of properties K from T
export type MyPick<T, K extends keyof T> = {
    [P in keyof T as P extends K ? P : never]: T[P];
};

// MyRecord<K, T> - constructs an object type whose property keys are K and whose property values are T
export type MyRecord<K extends keyof never, T> = {
    [P in K]: T;
};

// Complex type with infer, extends, and template literals
// ExtractFunctionReturnType - extracts return type from function type using infer
export type ExtractFunctionReturnType<F> = F extends (...args: never[]) => infer R ? R : never;

// Template literal type for event names
export type EventName<T extends string> = `on${Capitalize<T>}`;

// Complex type combining infer and conditional types
export type ApiResponse<T> = T extends 'success'
    ? { status: 200; data: ExtractFunctionReturnType<() => T> }
    : { status: 400; error: string };
