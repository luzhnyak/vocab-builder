import { useEffect, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { useWords } from "../../store";
import css from "./Dasboard.module.css";
import plus from "../../icons/plus.svg";
import arrowRight from "../../icons/switch-horizontal.svg";
import Modal from "../Modal/Modal";
import AddWordForm from "../Forms/AddWordForm";
const Dashboard = () => {
  const [showEditModal, setShowEditModal] = useState(false);

  const { getWordsCategories, categories } = useWords((state) => ({
    getWordsCategories: state.getWordsCategories,
    categories: state.categories,
  }));

  const handleSelect = () => {};

  useEffect(() => {
    getWordsCategories();
  }, [getWordsCategories]);
  return (
    <div className={css.wrapper}>
      <div>
        <input type="text" />
      </div>
      <div>
        <Dropdown
          items={categories || []}
          defaultSelect="Categories"
          onSelect={handleSelect}
        />
      </div>
      <div className={css.wrapperBtn}>
        To study: <span className={css.stadyCount}>20</span>
        <button className={css.btn} onClick={() => setShowEditModal(true)}>
          Add word
          <img src={plus} alt="" />
        </button>
        <button className={css.btn}>
          Train oneself
          <img src={arrowRight} alt="" />
        </button>
      </div>
      {showEditModal && (
        <Modal onClose={setShowEditModal}>
          <AddWordForm onClose={() => setShowEditModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
