// src/types/note.ts

export interface Note {
  id: number;
  title: string;
  content: string; // 🔧 зроблено обов’язковим
  tag: "Work" | "Personal" | "Study";
}

// Можна залишити ці типи, якщо вони використовуються у застосунку:

export type NoteTag = "Work" | "Personal" | "Study";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}
