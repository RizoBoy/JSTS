/**
 * Memoizes a function, caching its results based on arguments
 * @param fn - The function to memoize
 * @returns The memoized function
 */
export function memoize<F extends (...args: never[]) => unknown>(fn: F): F {
    const cache = new Map<string, ReturnType<F>>();

    return ((...args: Parameters<F>): ReturnType<F> => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key)!;
        }
        const result = fn(...args) as ReturnType<F>;
        cache.set(key, result);
        return result;
    }) as F;
}
