// src/types/note.ts

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: number;
  title: string;
  content: string; 
  tag: NoteTag;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}
