// src/components/NoteForm/NoteForm.tsx
import { Formik, Form, Field, ErrorMessage as FormikError } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import type { Note } from "../../types/note";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  tag: Yup.string()
    .oneOf(["Work", "Personal", "Study"])
    .required("Tag is required"),
});

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  const handleSubmit = (values: Omit<Note, "id">) => {
    mutation.mutate(values);
  };

  return (
    <Formik
      initialValues={{ title: "", content: "", tag: "Work" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.label}>
          Title:
          <Field className={css.input} type="text" name="title" />
          <FormikError name="title" component="div" className={css.error} />
        </label>

        <label className={css.label}>
          Content:
          <Field className={css.textarea} as="textarea" name="content" />
          <FormikError name="content" component="div" className={css.error} />
        </label>

        <label className={css.label}>
          Tag:
          <Field className={css.select} as="select" name="tag">
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Study">Study</option>
          </Field>
          <FormikError name="tag" component="div" className={css.error} />
        </label>

        <div className={css.buttons}>
          <button className={css.button} type="submit">
            Create
          </button>
          <button className={css.button} type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
