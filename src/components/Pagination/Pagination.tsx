import { FC } from "react";
import css from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  page: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  totalPages,
  page,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    const renderDots = (key: string | number) => (
      <li key={key} className="dots">
        ...
      </li>
    );

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li key={i} className={page === i ? "active" : ""}>
            <button
              onClick={() => handlePageChange(i)}
              className={page === i ? css.btnActive : css.btn}
            >
              {i}
            </button>
          </li>
        );
      }
    } else {
      let s = 1;
      let e = 3;
      if (page > 1) {
        s = page - 1;
        e = page + 1;
      }
      if (page > totalPages - 3) {
        s = totalPages - 3;
        e = totalPages - 1;
      }

      for (let i = s; i <= e; i++) {
        pageNumbers.push(
          <li key={i} className={page === i ? "active" : ""}>
            <button
              onClick={() => handlePageChange(i)}
              className={page === i ? css.btnActive : css.btn}
            >
              {i}
            </button>
          </li>
        );
      }

      pageNumbers.push(renderDots("dots1"));

      for (let i = totalPages; i <= totalPages; i++) {
        pageNumbers.push(
          <li key={i}>
            <button
              onClick={() => handlePageChange(i)}
              className={page === i ? css.btnActive : css.btn}
            >
              {i}
            </button>
          </li>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <nav className={css.wrapper}>
      <ul className={css.pagination}>
        <li>
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(1)}
            className={css.btn}
          >
            {"<<"}
          </button>
        </li>
        {page !== 1 && (
          <li>
            <button
              onClick={() => handlePageChange(page - 1)}
              className={css.btn}
            >
              {"<"}
            </button>
          </li>
        )}
        {renderPageNumbers()}
        {page !== totalPages && (
          <li>
            <button
              onClick={() => handlePageChange(page + 1)}
              className={css.btn}
            >
              {">"}
            </button>
          </li>
        )}
        <li>
          <button
            disabled={page === totalPages}
            onClick={() => handlePageChange(totalPages)}
            className={css.btn}
          >
            {">>"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
