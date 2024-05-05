import css from "./DictonaryTable.module.css";
import uk from "../../icons/uk.svg";
import ua from "../../icons/ua.svg";
import { useWords } from "../../store";
import { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

const RecommendTable = () => {
  const { allWords, getAllWords, addWord } = useWords((state) => ({
    allWords: state.allWords,
    addWord: state.addWord,
    getAllWords: state.getAllWords,
  }));

  useEffect(() => {
    getAllWords();
  }, [getAllWords]);

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
                    <FaArrowRight className={css.btnAddIcon} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecommendTable;
