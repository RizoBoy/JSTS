/**
 * Debounces a function, delaying its execution until after wait milliseconds have elapsed
 * since the last time the debounced function was invoked
 * @param fn - The function to debounce
 * @param delay - The number of milliseconds to delay
 * @returns The debounced function
 */
export function debounce<F extends (...args: never[]) => unknown>(
    fn: F,
    delay: number,
): (...args: Parameters<F>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    return (...args: Parameters<F>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}
