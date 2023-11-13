export const getDelta = <T extends Record<string, unknown>>(a: T, b: T) => {
  return Object.keys(a).reduce<Partial<Record<string, unknown>>>((acc, key) => {
    if (a[key] !== b[key]) {
      acc[key] = a[key];
    }
    return acc;
  }, {});
};
