import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteServices";
import type { NoteTag } from "../../types/note";
import css from "./NoteForm.module.css";

const NoteForm = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  const formik = useFormik({
    initialValues: { title: "", content: "", tag: "Todo" as NoteTag },
    validationSchema: Yup.object({
      title: Yup.string().min(3).max(50).required("Required"),
      content: Yup.string().max(500),
      tag: Yup.mixed<NoteTag>()
        .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
        .required("Required"),
    }),
    onSubmit: (values) => mutation.mutate(values),
  });

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          {...formik.getFieldProps("title")}
          className={css.input}
        />
        <span className={css.error}>
          {formik.touched.title && formik.errors.title}
        </span>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          rows={8}
          {...formik.getFieldProps("content")}
          className={css.textarea}
        />
        <span className={css.error}>
          {formik.touched.content && formik.errors.content}
        </span>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          {...formik.getFieldProps("tag")}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        <span className={css.error}>
          {formik.touched.tag && formik.errors.tag}
        </span>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onClose}>
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          Create note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
