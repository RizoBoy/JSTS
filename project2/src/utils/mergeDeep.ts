export function mergeDeep<A extends Record<string, unknown>, B extends Record<string, unknown>>(
  a: A,
  b: B
): A & B {
  const result = { ...a } as Record<string, unknown>;

  for (const key in b) {
    if (b.hasOwnProperty(key)) {
      if (
        typeof b[key] === 'object' &&
        b[key] !== null &&
        !Array.isArray(b[key]) &&
        typeof result[key] === 'object' &&
        result[key] !== null &&
        !Array.isArray(result[key])
      ) {
        result[key] = mergeDeep(result[key] as Record<string, unknown>, b[key] as Record<string, unknown>);
      } else {
        result[key] = b[key];
      }
    }
  }

  return result as A & B;
}