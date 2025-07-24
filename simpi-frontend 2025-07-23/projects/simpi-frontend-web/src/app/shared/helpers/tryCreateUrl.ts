export const tryCreateUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.host + url.pathname + url.search + url.hash;
  } catch {
    return value;
  }
};
