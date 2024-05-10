import css from "./DictonaryTable.module.css";
import uk from "../../icons/uk.svg";
import ua from "../../icons/ua.svg";
import { useWords } from "../../store";
import { useEffect } from "react";
import arrowRight from "../../icons/switch-horizontal.svg";
import { addWord } from "../../services/vocabApi";
import Pagination from "../Pagination/Pagination";
import NotFound from "../NotFound/NotFound";

const RecommendTable = () => {
  const {
    allWords,
    category,
    page,
    keyword,
    isIrregular,
    getAllWords,
    setPage,
    setTrainingCount,
  } = useWords((state) => ({
    allWords: state.allWords,
    category: state.category,
    isIrregular: state.isIrregular,
    page: state.page,
    keyword: state.keyword,
    getAllWords: state.getAllWords,
    setPage: state.setPage,
    setTrainingCount: state.setTrainingCount,
  }));

  useEffect(() => {
    getAllWords({
      category: category || "",
      page: page.toString(),
      isIrregular: isIrregular.toString(),
      keyword: keyword || "",
    });
  }, [getAllWords, page, keyword, category, isIrregular]);

  const handleAddToDictonary = async (id: string) => {
    await addWord(id);
    setTrainingCount();
  };

  return (
    <div>
      {allWords?.results.length !== 0 && (
        <table className={css.table} cellSpacing={0}>
          <thead>
            <tr className={css.headRow}>
              <th>
                <div className={css.thWrapper}>
                  <span>Word</span>
                  <img src={uk} alt="Word" className={css.flag} />
                </div>
              </th>
              <th>
                <div className={css.thWrapper}>
                  <span>Translation</span>
                  <img src={ua} alt="Translation" className={css.flag} />
                </div>
              </th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allWords?.results.map((word) => {
              return (
                <tr className={css.bodyRow} key={word._id}>
                  <td>{word.en}</td>
                  <td>{word.ua}</td>
                  <td>{word.category}</td>

                  <td className={css.lastTd}>
                    <button
                      className={css.btnAdd}
                      onClick={() => handleAddToDictonary(word._id)}
                    >
                      <span className={css.btnHide}>Add to dictionary</span>
                      <img src={arrowRight} alt="" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {allWords?.results.length !== 0 && (
        <Pagination
          totalPages={allWords?.totalPages || 1}
          page={page}
          onPageChange={setPage}
        />
      )}
      {allWords?.results.length === 0 && <NotFound />}
    </div>
  );
};

export default RecommendTable;
