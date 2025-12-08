export function getStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    if (value === null) return fallback;
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
