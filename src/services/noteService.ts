import axios from "axios";
import type { Note, NotesResponse } from "../types/note";

const axiosInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    
  },
  
});
console.log("TOKEN", import.meta.env.VITE_API_KEY);



export const fetchNotes = async (
  page: number,
  searchText: string
): Promise<NotesResponse> => {
  const params: Record<string, string | number> = {
    page,
    perPage: 10,
  };

  if (searchText.trim().length > 0) {
    params.search = searchText.trim();
  }

  try {
    const { data } = await axiosInstance.get<NotesResponse>("/notes", { });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios GET error:", error.response?.status, error.response?.data);
    } else {
      console.error("Unexpected GET error:", error);
    }
    throw error;
  }
};

export const createNote = async (note: Omit<Note, "id">): Promise<Note> => {
  try {
    const { data } = await axiosInstance.post<Note>("/notes", note);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios POST error:", error.response?.status, error.response?.data);
    } else {
      console.error("Unexpected POST error:", error);
    }
    throw error;
  }
};

export const deleteNote = async (id: number): Promise<Note> => {
  try {
    const { data } = await axiosInstance.delete<Note>(`/notes/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios DELETE error:", error.response?.status, error.response?.data);
    } else {
      console.error("Unexpected DELETE error:", error);
    }
    throw error;
  }
};
