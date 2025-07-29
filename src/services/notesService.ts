import { authService } from "./authService";

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  category: "question" | "observation" | "medication" | "appointment" | "general";
  createdAt: string;
  updatedAt: string;
}

const API_URL = import.meta.env.VITE_API_URL + "/notes";

function getAuthHeaders() {
  const token = authService.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const notesService = {
  async getNotes(): Promise<Note[]> {
    const response = await fetch(API_URL, {
      headers: {
        ...getAuthHeaders(),
      },
    });
    if (!response.ok) throw new Error("Failed to fetch notes");
    return response.json();
  },

  async addNote(note: Omit<Note, "id" | "userId" | "createdAt" | "updatedAt">): Promise<Note> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) throw new Error("Failed to add note");
    return response.json();
  },

  async updateNote(id: string, note: Partial<Omit<Note, "id" | "userId" | "createdAt" | "updatedAt">>): Promise<Note> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) throw new Error("Failed to update note");
    return response.json();
  },

  async deleteNote(id: string): Promise<Note> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        ...getAuthHeaders(),
      },
    });
    if (!response.ok) throw new Error("Failed to delete note");
    return response.json();
  },
};
