import { useTeachers } from "../../store";
import css from "./LoadMore.module.css";
const LoadMore = () => {
  const { loadTeachers } = useTeachers((state) => ({
    loading: state.loading,
    error: state.error,
    items: state.items,
    loadTeachers: state.loadTeachers,
  }));

  const handleLoadMore = () => {
    loadTeachers();
  };

  return (
    <button className={css.btn} type="button" onClick={handleLoadMore}>
      Load more
    </button>
  );
};

export default LoadMore;
