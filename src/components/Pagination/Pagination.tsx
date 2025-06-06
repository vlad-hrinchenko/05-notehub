import React from "react";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (selectedPage: number) => void;
}

const Pagination = ({ page, pageCount, onPageChange }: PaginationProps) => {
  return (
    <ReactPaginate
      className={css.pagination}
      pageCount={pageCount}
      forcePage={page - 1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      previousLabel="<"
      nextLabel=">"
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      activeClassName={css.active}
      breakLabel="..."
    />
  );
};

export default Pagination;
