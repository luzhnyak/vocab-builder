import css from "./DictonaryTable.module.css";
import uk from "../../icons/uk.svg";
import ua from "../../icons/ua.svg";
import { useAuth, useWords } from "../../store";
import { useEffect, useState } from "react";
import Popup from "../Popup/Popup";
import Modal from "../Modal/Modal";
import EditWordForm from "../Forms/EditWordForm";
import CircularProgress from "../Progress/CircularProgress";
import Pagination from "../Pagination/Pagination";
import NotFound from "../NotFound/NotFound";

const DictonaryTable = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [idWord, setIdWord] = useState<string | null>(null);

  const {
    ownWords,
    category,
    page,
    refresh,
    keyword,
    isIrregular,
    getOwnWords,
    setPage,
    setTrainingCount,
  } = useWords((state) => ({
    category: state.category,
    isIrregular: state.isIrregular,
    page: state.page,
    refresh: state.refresh,
    keyword: state.keyword,
    ownWords: state.ownWords,
    setPage: state.setPage,
    getOwnWords: state.getOwnWords,
    setTrainingCount: state.setTrainingCount,
  }));

  const { isLogin } = useAuth((state) => ({
    isLogin: state.isLogin,
  }));

  useEffect(() => {
    if (!isLogin) return;

    getOwnWords({
      category: category || "",
      page: page.toString(),
      isIrregular: isIrregular.toString(),
      keyword: keyword || "",
    });

    setTrainingCount();
  }, [
    getOwnWords,
    page,
    keyword,
    category,
    isIrregular,
    refresh,
    isLogin,
    setTrainingCount,
  ]);

  const handlePopupClick = (id: string) => {
    setShowPopup(!showPopup);
    setIdWord(id);
  };

  return (
    <div>
      {ownWords?.results.length !== 0 && (
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
              <th className={css.category}>Category</th>
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
                    <td className={css.category}>{word.category}</td>
                    <td>
                      <div className={css.progressWrapper}>
                        <span className={css.category}>{word.progress} %</span>
                        <CircularProgress
                          size={26}
                          strokeWidth={4}
                          progress={word.progress}
                          color1="#2BD627"
                          color2="#D4F8D3"
                          color3="#D4F8D3"
                        />
                      </div>
                    </td>
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
      )}
      {ownWords?.results.length !== 0 && (
        <Pagination
          totalPages={ownWords?.totalPages || 1}
          page={page}
          onPageChange={setPage}
        />
      )}
      {ownWords?.results.length === 0 && <NotFound />}
    </div>
  );
};

export default DictonaryTable;
