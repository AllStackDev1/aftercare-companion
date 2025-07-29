import { authService } from "./authService";

export interface TrackerEntry {
  id: string;
  userId: string;
  data: any;
}

const API_URL = import.meta.env.VITE_API_URL + "/trackers";

function getAuthHeaders() {
  const token = authService.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const trackersService = {
  async getTrackers(): Promise<TrackerEntry[]> {
    const response = await fetch(API_URL, {
      headers: {
        ...getAuthHeaders(),
      },
    });
    if (!response.ok) throw new Error("Failed to fetch trackers");
    return response.json();
  },

  async addTracker(data: any): Promise<TrackerEntry> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to add tracker");
    return response.json();
  },
};
