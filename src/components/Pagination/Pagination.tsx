import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

type Props = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, pageCount, onPageChange }: Props) => {
  return (
    <ReactPaginate
      forcePage={page - 1}
      pageCount={pageCount}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      containerClassName={css.container}
      activeClassName={css.active}
      pageLinkClassName={css.pageLink}
      previousLabel="<"
      nextLabel=">"
    />
  );
};

export default Pagination;
