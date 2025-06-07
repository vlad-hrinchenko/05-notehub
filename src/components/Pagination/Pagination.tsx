import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (selected: number) => void;
}

const Pagination = ({ page, pageCount, onPageChange }: PaginationProps) => {
  return (
    <ReactPaginate
      forcePage={page - 1}
      pageCount={pageCount}
      onPageChange={(e) => onPageChange(e.selected + 1)}
      containerClassName={css.container}
      activeClassName={css.active}
    />
  );
};

export default Pagination;
