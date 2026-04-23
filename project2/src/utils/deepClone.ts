export function deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime()) as T;
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => deepClone(item)) as T;
    }

    if (typeof obj === 'object') {
        const clonedObj = {} as Record<string, unknown>;
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone((obj as Record<string, unknown>)[key]);
            }
        }
        return clonedObj as T;
    }

    return obj;
}
