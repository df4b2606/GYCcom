/**
 * Device ID utility functions
 * Generates a unique device ID on first visit and stores it in localStorage and cookie
 */

const DEVICE_ID_KEY = "device_id";
const DEVICE_ID_COOKIE = "device_id";

/**
 * Generate a new UUID
 */
function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for older browsers
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Set cookie with device ID
 */
function setCookie(name: string, value: string, days: number = 365): void {
  if (typeof document === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

/**
 * Get cookie value by name
 */
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

/**
 * Get device ID from localStorage or cookie
 * If not found, generate a new one and store it
 */
export function getDeviceId(): string {
  // Try to get from localStorage first
  let deviceId = null;

  if (typeof localStorage !== "undefined") {
    deviceId = localStorage.getItem(DEVICE_ID_KEY);
  }

  // If not in localStorage, try cookie
  if (!deviceId) {
    deviceId = getCookie(DEVICE_ID_COOKIE);
  }

  // If still not found, generate a new one
  if (!deviceId) {
    deviceId = generateUUID();

    // Store in localStorage
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem(DEVICE_ID_KEY, deviceId);
      } catch (error) {
        console.warn("Failed to store device ID in localStorage:", error);
      }
    }

    // Store in cookie as backup
    setCookie(DEVICE_ID_COOKIE, deviceId);
  } else {
    // If found in one place but not the other, sync them
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem(DEVICE_ID_KEY, deviceId);
      } catch (error) {
        console.warn("Failed to sync device ID to localStorage:", error);
      }
    }
    setCookie(DEVICE_ID_COOKIE, deviceId);
  }

  return deviceId;
}

/**
 * Clear device ID from localStorage and cookie
 * Useful for testing or when user wants to reset their identity
 */
export function clearDeviceId(): void {
  if (typeof localStorage !== "undefined") {
    try {
      localStorage.removeItem(DEVICE_ID_KEY);
    } catch (error) {
      console.warn("Failed to remove device ID from localStorage:", error);
    }
  }

  // Clear cookie by setting it to expire in the past
  setCookie(DEVICE_ID_COOKIE, "", -1);
}

/**
 * Check if device ID exists
 */
export function hasDeviceId(): boolean {
  if (typeof localStorage !== "undefined") {
    const localId = localStorage.getItem(DEVICE_ID_KEY);
    if (localId) return true;
  }

  const cookieId = getCookie(DEVICE_ID_COOKIE);
  return cookieId !== null;
}
