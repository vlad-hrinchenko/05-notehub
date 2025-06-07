import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { fetchNotes, deleteNote } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import NoteModal from "../NoteModal/NoteModal";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import css from "./App.module.css";
import { useDebounce } from "use-debounce";
import type { NotesResponse } from "../../types/note";

const App = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<NotesResponse>({
    queryKey: ["notes", debouncedSearchTerm, page],
    queryFn: () => fetchNotes(debouncedSearchTerm, page),
    placeholderData: keepPreviousData,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={searchTerm}
          onChange={(value) => {
            setSearchTerm(value);
            setPage(1);
          }}
        />
        {!!data?.totalPages && data.totalPages > 1 && (
          <Pagination
            page={page}
            pageCount={data.totalPages}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes.</p>}

      {Array.isArray(data?.notes) && data.notes.length > 0 && (
        <NoteList notes={data.notes} onDelete={deleteMutation.mutate} />
      )}

      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default App;
