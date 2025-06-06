import axios from "axios";
import { type Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchNotes = async (page = 1, search = "") => {
  const response = await axiosInstance.get(``, {
    params: {
      page,
      perPage: 12,
      search,
    },
  });
  return response.data;
};

export const createNote = async (data: Omit<Note, "id">) => {
  const response = await axiosInstance.post("", data);
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await axiosInstance.delete(`/${id}`);
  return response.data;
};
