// src/services/noteService.ts
import axios from "axios";
import type { Note, NotesResponse } from "../types/note";

const axiosInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api/docs",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
});

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

  const { data } = await axiosInstance.get<NotesResponse>("", {
    params,
  });
  return data;
};

export const createNote = async (note: Omit<Note, "id">): Promise<Note> => {
  const { data } = await axiosInstance.post<Note>("", note);
  return data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const { data } = await axiosInstance.delete<Note>(`/${id}`);
  return data;
};
