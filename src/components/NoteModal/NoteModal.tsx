import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import NoteForm from "../NoteForm/NoteForm";
import css from "./NoteModal.module.css";

export interface NoteModalProps {
  onClose: () => void;
}

const NoteModal = ({ onClose }: NoteModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <NoteForm onClose={onClose} />
      </div>
    </div>,
    document.body
  );
};

export default NoteModal;
