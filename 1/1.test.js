function DeepEqual(a, b) {
    if (a === b) return true;

    if (typeof a !== 'object' || a === null ||
        typeof b !== 'object' || b === null)
        return false;

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
        if (!keysB.includes(key)) return false;
        if (!DeepEqual(a[key], b[key])) return false;
    }

    return true;
}

describe('DeepEqual', () => {
    test('1', () => {
        expect(DeepEqual(5, 5)).toBe(true);
        expect(DeepEqual('test', 'test')).toBe(true);
        expect(DeepEqual(true, true)).toBe(true);
        expect(DeepEqual(null, null)).toBe(true);
    });

    test('2', () => {
        expect(DeepEqual(5, 10)).toBe(false);
        expect(DeepEqual('hello', 'world')).toBe(false);
        expect(DeepEqual(true, false)).toBe(false);
        expect(DeepEqual(null, undefined)).toBe(false);
    });

    test('3', () => {
        expect(DeepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    });

    test('4', () => {
        expect(DeepEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
    });

    test('5', () => {
        expect(DeepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
    });

    test('6', () => {
        const a = { x: 1, y: { z: [1, 2, { v: 3 }] } };
        const b = { x: 1, y: { z: [1, 2, { v: 3 }] } };
        expect(DeepEqual(a, b)).toBe(true);
    });

    test('7', () => {
        const a = { x: 1, y: { z: [1, 2, { v: 3 }] } };
        const b = { x: 1, y: { z: [1, 2, { v: 4 }] } };
        expect(DeepEqual(a, b)).toBe(false);
    });
});