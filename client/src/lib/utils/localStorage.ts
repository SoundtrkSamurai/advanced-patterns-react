export function getItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error(`Error parsing JSON from localStorage key "${key}":`, error);
    return null;
  }
}
export function setItem<T>(key: string, value: T): void {
  try {
    const item = JSON.stringify(value);
    localStorage.setItem(key, item);
  } catch (error) {
    console.error(
      `Error stringifying value for localStorage key "${key}":`,
      error,
    );
  }
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item from localStorage key "${key}":`, error);
  }
}

export function clear(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}

export function getAllKeys(): string[] {
  try {
    return Object.keys(localStorage);
  } catch (error) {
    console.error("Error getting all keys from localStorage:", error);
    return [];
  }
}

export function getAllItems(): Record<string, string> {
  try {
    const items: Record<string, string> = {};
    const keys = getAllKeys();
    keys.forEach((key) => {
      items[key] = localStorage.getItem(key) || "";
    });
    return items;
  } catch (error) {
    console.error("Error getting all items from localStorage:", error);
    return {};
  }
}

export function getItemWithDefault<T>(key: string, defaultValue: T): T {
  const item = getItem<T>(key);
  return item !== null ? item : defaultValue;
}
