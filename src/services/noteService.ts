// src/services/noteService.ts
import axios from "axios";
import type { Note, NotesResponse } from "../types/note";

const axiosInstance = axios.create({
  baseURL: "https://notehub-public.goit.study",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
});

// Отримання нотаток
export const fetchNotes = async (
  page: number,
  searchTerm: string
): Promise<NotesResponse> => {
  const params: Record<string, string | number> = {
    page,
    limit: 12,
  };

  if (searchTerm.trim()) {
    params.search = searchTerm.trim();
  }

  const { data } = await axiosInstance.get<NotesResponse>("/note", {
    params,
  });
  return data;
};

// Створення нотатки
export const createNote = async (note: Omit<Note, "id">): Promise<Note> => {
  const { data } = await axiosInstance.post<Note>("/note", note);
  return data;
};

// Видалення нотатки (тепер повертає Note)
export const deleteNote = async (id: number): Promise<Note> => {
  const { data } = await axiosInstance.delete<Note>(`/note/${id}`);
  return data;
};
