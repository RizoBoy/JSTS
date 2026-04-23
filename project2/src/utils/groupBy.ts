/**
 * Groups an array of objects by a specified key
 * @param array - The array to group
 * @param key - The key to group by
 * @returns An object with keys as group names and values as arrays of grouped items
 */
export function groupBy<T extends Record<string, unknown>, K extends keyof T>(
    array: readonly T[],
    key: K,
): Record<string, T[]> {
    return array.reduce(
        (groups, item) => {
            const groupKey = String(item[key]);
            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push(item);
            return groups;
        },
        {} as Record<string, T[]>,
    );
}
