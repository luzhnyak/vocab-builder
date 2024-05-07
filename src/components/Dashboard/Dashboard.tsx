import { useEffect, useState, FC } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { useAuth, useWords } from "../../store";
import css from "./Dasboard.module.css";
import plus from "../../icons/plus.svg";
import arrowRight from "../../icons/switch-horizontal.svg";
import Modal from "../Modal/Modal";
import AddWordForm from "../Forms/AddWordForm";
import search from "../../icons/search.svg";
import { NavLink } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

interface IProps {
  isAddWord?: boolean;
}

const Dashboard: FC<IProps> = ({ isAddWord = false }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const {
    categories,
    category,
    isIrregular,
    getWordsCategories,
    setWordsCategory,
    setKeyword,
    setPage,
    setIsIrregular,
  } = useWords((state) => ({
    categories: state.categories,
    category: state.category,
    isIrregular: state.isIrregular,
    page: state.page,
    keyword: state.keyword,
    getWordsCategories: state.getWordsCategories,
    setWordsCategory: state.setWordsCategory,
    setIsIrregular: state.setIsIrregular,
    setKeyword: state.setKeyword,
    setPage: state.setPage,
    getOwnWords: state.getOwnWords,
  }));

  const { isLogin } = useAuth((state) => ({
    isLogin: state.isLogin,
  }));

  const { control, handleSubmit } = useForm<{ keyword: string }>({
    defaultValues: {
      keyword: "",
    },
  });

  const handleSelect = (item: string) => {
    setWordsCategory(item);
    setPage(1);
  };

  const onSubmit: SubmitHandler<{ keyword: string }> = async ({ keyword }) => {
    setKeyword(keyword);
    setPage(1);
  };

  useEffect(() => {
    if (!isLogin) return;

    getWordsCategories();
  }, [getWordsCategories, isLogin]);

  return (
    <div className={css.wrapper}>
      <div className={css.wrapperBtn}>
        <div className={css.inputWrapper}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="keyword"
              control={control}
              render={({ field }) => (
                <input type="text" {...field} className={css.input} />
              )}
            />
            <button type="submit" className={css.btnSearch}>
              <img src={search} alt="ShowPassword" />
            </button>
          </form>
        </div>
        <div className={css.dropdounWrapper}>
          <Dropdown
            items={categories || []}
            defaultSelect="verb"
            onSelect={handleSelect}
          />
        </div>
        {category === "verb" && (
          <div className={css.radioGroup}>
            <div className={css.radioWrapper}>
              <input
                name="isIrregular"
                className={css.inputRadio}
                type="radio"
                id="option-1"
                value={"false"}
                checked={!isIrregular}
                onChange={() => setIsIrregular(false)}
              />
              <label htmlFor="option-1">Regular</label>
            </div>
            <div className={css.radioWrapper}>
              <input
                name="isIrregular"
                className={css.inputRadio}
                type="radio"
                id="option-2"
                value={"true"}
                checked={isIrregular}
                onChange={() => setIsIrregular(true)}
              />
              <label htmlFor="option-2">Irregular</label>
            </div>
          </div>
        )}
      </div>

      <div className={css.wrapperBtn}>
        To study: <span className={css.stadyCount}>20</span>
        {isAddWord && (
          <button className={css.btn} onClick={() => setShowEditModal(true)}>
            Add word
            <img src={plus} alt="" />
          </button>
        )}
        <NavLink className={css.btn} to="/training">
          Train oneself
          <img src={arrowRight} alt="" />
        </NavLink>
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
