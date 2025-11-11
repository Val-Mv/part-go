export interface UserProfile {
  nombre: string;
  telefono: string;
  direccion: string;
  correo: string;
}

const STORAGE_KEY = "partgo_user_profile";

export const saveUserProfile = (profile: UserProfile): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error("Error saving user profile:", error);
  }
};

export const getUserProfile = (): UserProfile | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading user profile:", error);
  }
  return null;
};

export const clearUserProfile = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing user profile:", error);
  }
};
