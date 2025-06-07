import axios from "axios";
import type { Note, NotesResponse } from "../types/note";

const axiosInstance = axios.create({
  baseURL: "https://notehub-public.goit.study",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
});

export const fetchNotes = async (
  page: number,
  searchTerm: string
): Promise<NotesResponse> => {
  const { data } = await axiosInstance.get<NotesResponse>("/note", {
    params: {
      page,
      limit: 12,
      search: searchTerm,
    },
  });
  return data;
};

export const createNote = async (note: Omit<Note, "id">) => {
  const { data } = await axiosInstance.post<Note>("/note", note);
  return data;
};

export const deleteNote = async (id: number) => {
  const { data } = await axiosInstance.delete(`/note/${id}`);
  return data;
};
