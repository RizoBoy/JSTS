export type MyPartial<T> = {
    [P in keyof T]?: T[P];
};

export type MyReadonly<T> = {
    readonly [P in keyof T]: T[P];
};

export type MyOmit<T, K extends keyof T> = {
    [P in keyof T as P extends K ? never : P]: T[P];
};

export type MyPick<T, K extends keyof T> = {
    [P in keyof T as P extends K ? P : never]: T[P];
};

export type MyRecord<K extends keyof never, T> = {
    [P in K]: T;
};

export type ExtractFunctionReturnType<F> = F extends (...args: never[]) => infer R ? R : never;

export type EventName<T extends string> = `on${Capitalize<T>}`;

export type ApiResponse<T> = T extends 'success'
    ? { status: 200; data: ExtractFunctionReturnType<() => T> }
    : { status: 400; error: string };

export function assertIsString(value: unknown): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('Value is not a string');
    }
}
