import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

export interface NoteListProps {
  notes: Note[];
  onDelete: (id: number) => void;
}

const NoteList = ({ notes, onDelete }: NoteListProps) => {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <span className={css.tag}>{note.tag}</span>
          <button
            onClick={() => onDelete(note.id)}
            className={css.deleteButton}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
