import axios from "axios";
import type { Note, NotesResponse } from "../types/note";

const axiosInstance = axios.create({
  baseURL: "https://notehub-public.goit.study",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
});

export const fetchNotes = async (
  searchTerm: string,
  page: number
): Promise<NotesResponse> => {
  const { data } = await axiosInstance.get<NotesResponse>("/note", {
    params: {
      search: searchTerm,
      page,
      limit: 12,
    },
  });
  return data;
};

export const createNote = async (note: Omit<Note, "id">): Promise<Note> => {
  const { data } = await axiosInstance.post<Note>("/note", note);
  return data;
};

export const deleteNote = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/note/${id}`);
};
