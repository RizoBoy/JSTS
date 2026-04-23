/**
 * Ensures a function is called only once
 * @param fn - The function to call once
 * @returns A function that can only be called once
 */
export function once<F extends (...args: never[]) => unknown>(fn: F): F {
    let called = false;
    let result: ReturnType<F>;

    return ((...args: Parameters<F>): ReturnType<F> => {
        if (!called) {
            called = true;
            result = fn(...args) as ReturnType<F>;
        }
        return result;
    }) as F;
}
