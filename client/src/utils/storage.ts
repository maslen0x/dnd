const suffix = 'dnd';

export const storage = {
  get: <T>(key: string) => {
    const item = localStorage.getItem(`${suffix}:${key}`);
    return item ? (JSON.parse(item) as T) : null;
  },

  set: (key: string, value: unknown) => {
    localStorage.setItem(`${suffix}:${key}`, JSON.stringify(value));
  },

  remove: (key: string) => {
    localStorage.removeItem(`${suffix}:${key}`);
  },
};
