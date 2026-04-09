export function clone(value) {
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(clone);
  }

  const result = {};

  for (const key in value) {
    result[key] = clone(value[key]);
  }

  return result;
}