import css from "./DictonaryTable.module.css";
import uk from "../../icons/uk.svg";
import ua from "../../icons/ua.svg";
import { useWords } from "../../store";
import { useEffect } from "react";
import arrowRight from "../../icons/switch-horizontal.svg";
import { addWord } from "../../services/vocabApi";
import Pagination from "../Pagination/Pagination";

const RecommendTable = () => {
  const {
    allWords,
    category,
    page,
    keyword,
    isIrregular,
    getAllWords,
    setPage,
  } = useWords((state) => ({
    allWords: state.allWords,
    category: state.category,
    isIrregular: state.isIrregular,
    page: state.page,
    keyword: state.keyword,
    getAllWords: state.getAllWords,
    setPage: state.setPage,
  }));

  useEffect(() => {
    getAllWords({
      category: category || "",
      page: page.toString(),
      isIrregular: isIrregular.toString(),
      keyword: keyword || "",
    });
  }, [getAllWords, page, keyword, category, isIrregular]);

  const handleAddToDictonary = (id: string) => {
    addWord(id);
  };

  return (
    <div>
      <table className={css.table} cellSpacing={0}>
        <thead>
          <tr className={css.headRow}>
            <th>
              <div className={css.thWrapper}>
                <span>Word</span>
                <img src={uk} alt="Word" />
              </div>
            </th>
            <th>
              <div className={css.thWrapper}>
                <span>Translation</span>
                <img src={ua} alt="Translation" />
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
                    Add to dictionary
                    <img src={arrowRight} alt="" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        totalPages={allWords?.totalPages || 1}
        page={page}
        onPageChange={setPage}
      />
    </div>
  );
};

export default RecommendTable;
