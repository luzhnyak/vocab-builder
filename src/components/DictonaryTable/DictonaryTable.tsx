import css from "./DictonaryTable.module.css";
import uk from "../../icons/uk.svg";
import ua from "../../icons/ua.svg";
import { useWords } from "../../store";
import { useEffect, useState } from "react";
import Popup from "../Popup/Popup";
import Modal from "../Modal/Modal";
import EditWordForm from "../Forms/EditWordForm";

const DictonaryTable = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [idWord, setIdWord] = useState<string | null>(null);

  const { ownWords, getOwnWords } = useWords((state) => ({
    ownWords: state.ownWords,
    getOwnWords: state.getOwnWords,
  }));

  useEffect(() => {
    getOwnWords();
  }, [getOwnWords]);

  const handlePopupClick = (id: string) => {
    setShowPopup(!showPopup);
    setIdWord(id);
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
            <th>Progress</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ownWords?.results &&
            ownWords?.results.map((word) => {
              return (
                <tr className={css.bodyRow} key={word._id}>
                  <td>{word.en}</td>
                  <td>{word.ua}</td>
                  <td>{word.category}</td>
                  <td> {word.progress} %</td>
                  <td className={css.lastTd}>
                    <button
                      className={css.btnPopup}
                      onClick={() => handlePopupClick(word._id)}
                    >
                      ...
                    </button>
                    <div className={css.popupWrapper}>
                      {showPopup && idWord === word._id && (
                        <Popup
                          setShowEditModal={setShowEditModal}
                          onClose={() => setShowPopup(false)}
                          id={word._id}
                        />
                      )}
                    </div>
                    {showEditModal && idWord === word._id && (
                      <Modal onClose={setShowEditModal}>
                        <EditWordForm
                          onClose={() => setShowEditModal(false)}
                          id={word._id}
                          en={word.en}
                          ua={word.ua}
                          category={word.category}
                          isIrregular={word.isIrregular}
                        />
                      </Modal>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default DictonaryTable;
