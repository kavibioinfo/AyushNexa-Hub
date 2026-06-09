// Memory fallback for environments where localStorage is blocked (such as sandboxed iframes)
const memoryStorage: Record<string, string> = {};

export const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn(`safeStorage.getItem failed for key "${key}", using memory fallback:`, e);
    }
    return memoryStorage[key] || null;
  },

  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
        return;
      }
    } catch (e) {
      console.warn(`safeStorage.setItem failed for key "${key}", using memory fallback:`, e);
    }
    memoryStorage[key] = value;
  },

  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
        return;
      }
    } catch (e) {
      console.warn(`safeStorage.removeItem failed for key "${key}", using memory fallback:`, e);
    }
    delete memoryStorage[key];
  },

  // Added from vivah-parichay
  clear: (): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.clear();
        return;
      }
    } catch (e) {
      console.warn(`safeStorage.clear failed, using memory fallback:`, e);
    }
    Object.keys(memoryStorage).forEach(key => delete memoryStorage[key]);
  }
};