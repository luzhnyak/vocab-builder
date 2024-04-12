import { FC, useState } from "react";
import css from "./Card.module.css";

import heart from "../../images/heart.svg";
import heartFav from "../../images/heart-fav.svg";

import book from "../../images/book.svg";
import star from "../../images/star.svg";
import Modal from "../Modal/Modal";
import BookForm from "../Forms/BookForm";
import { ITeacher } from "../../types";
import { useLocal } from "../../store";
import LoginForm from "../Forms/LoginForm";
import { toast } from "react-toastify";

interface IProps {
  data: ITeacher;
}
const Card: FC<IProps> = ({ data }) => {
  const [isMore, setMore] = useState(false);
  const [isShowBook, setShowBook] = useState(false);
  const [isShowLogin, setShowLogin] = useState(false);

  const { favorites, addFav, removeFav, isLogin } = useLocal((state) => ({
    favorites: state.favorites,
    isLogin: state.isLogin,
    addFav: state.addFav,
    removeFav: state.removeFav,
  }));

  const {
    id,
    name,
    surname,
    avatar_url,
    rating,
    reviews,
    languages,
    levels,
    price_per_hour,
    lessons_done,
    lesson_info,
    experience,
    conditions,
  } = data;

  const isFav = !!favorites.find((item) => item.id === id);

  const handleClickFav = () => {
    if (!isLogin) {
      toast.warning("You must be registered to add to favorites!");
      return;
    }
    if (isFav) {
      removeFav(id);
    } else {
      addFav(data);
    }
  };

  return (
    <article className={css.wrapper}>
      <div className={css.imageWrapper}>
        <img
          className={css.image}
          src={avatar_url}
          alt={`${name} ${surname}`}
          width={96}
          height={96}
        />
      </div>
      <div className={css.cardBody}>
        <div className={css.cardHeader}>
          <span className={css.languages}>Languages</span>
          <ul className={css.headerList}>
            <li className={css.headerItem}>
              <img src={book} alt="Book" width={16} height={16} />
              <span>Lessons online</span>
            </li>
            <li className={css.headerItem}>
              <span>Lessons done: {lessons_done}</span>
            </li>
            <li className={css.headerItem}>
              <img src={star} alt="Star" width={16} height={16} />
              <span>Rating: {rating}</span>
            </li>
            <li className={css.headerItem}>
              <span>
                Price / 1 hour:{" "}
                <span className={css.price}>{price_per_hour}$</span>
              </span>
            </li>
          </ul>
          <button className={css.btnFav} type="button" onClick={handleClickFav}>
            <img
              src={isFav && isLogin ? heartFav : heart}
              alt="Favorites"
              width={26}
              height={26}
            />
          </button>
        </div>
        <h2 className={css.cardTitle}>{`${name} ${surname}`}</h2>
        <p className={css.cardInfo}>
          <span className={css.greyText}>Speaks: </span>
          {languages.map((item, index) => (
            <span key={index}>{item}, </span>
          ))}
        </p>
        <p className={css.cardInfo}>
          <span className={css.greyText}>Lesson Info: </span> {lesson_info}
        </p>

        <p className={css.cardInfo}>
          <span className={css.greyText}>Conditions: </span>
          {conditions.map((item, index) => (
            <span key={index}>{item} </span>
          ))}
        </p>

        {!isMore && (
          <button className={css.btnReadMore} onClick={() => setMore(!isMore)}>
            Read more
          </button>
        )}

        {isMore && <p className={css.text}>{experience}</p>}

        {isMore && (
          <ul className={css.commentsList}>
            {reviews.map((item, index) => (
              <li className={css.commentItem} key={index}>
                <div className={css.commentHeader}>
                  <img
                    className={css.commentPhoto}
                    src={item.avatar_url}
                    alt={item.reviewer_name}
                    width={44}
                    height={44}
                  />
                  <div>
                    <h4 className={css.commentTitle}>{item.reviewer_name}</h4>
                    <div className={css.commentRateWrapper}>
                      <img src={star} alt="Star" width={16} height={16} />
                      <span className={css.commentRate}>
                        {item.reviewer_rating}
                      </span>
                    </div>
                  </div>
                </div>
                <p className={css.commentText}>{item.comment}</p>
              </li>
            ))}
          </ul>
        )}

        <ul className={css.cardFooter}>
          {levels.map((level, index) => (
            <li className={css.footerItem} key={index}>
              {level}
            </li>
          ))}
        </ul>

        {isMore && (
          <button className={css.btnBook} onClick={() => setShowBook(true)}>
            Book trial lesson
          </button>
        )}
        {isShowBook && (
          <Modal onClose={() => setShowBook(false)}>
            <BookForm setShowBook={setShowBook} />
          </Modal>
        )}
        {isShowLogin && (
          <Modal onClose={() => setShowLogin(false)}>
            <LoginForm setShowLogin={setShowLogin} />
          </Modal>
        )}
      </div>
    </article>
  );
};

export default Card;
