import { Link, NavLink } from "react-router-dom";
import css from "./Header.module.css";

import logo from "../../icons/logo.svg";

import { useState } from "react";

import { useAuth } from "../../store";
import { FaArrowRight } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const { logout, isLogin, currentUser } = useAuth((state) => ({
    logout: state.logout,
    isLogin: state.isLogin,
    currentUser: state.currentUser,
  }));

  return (
    <header className={`container ${css.header}`}>
      <nav className={css.nav}>
        <Link className={css.logo} to="/">
          <img className={css.logoImg} src={logo} />
          <span className={css.logoText}>VocabBuilder</span>
        </Link>
        <ul
          className={
            isOpenMenu ? [css.menu, css.isShowMenu].join(" ") : css.menu
          }
        >
          <li className={css.menuItem}>
            <NavLink
              className={css.menuLink}
              to="/dictionary"
              onClick={() => {
                setIsOpenMenu(!isOpenMenu);
              }}
            >
              Dictionary
            </NavLink>
          </li>
          <li className={css.menuItem}>
            <NavLink
              className={css.menuLink}
              to="/recomend"
              onClick={() => {
                setIsOpenMenu(!isOpenMenu);
              }}
            >
              Recommend
            </NavLink>
          </li>

          <li className={css.menuItem}>
            <NavLink
              className={css.menuLink}
              to="/training"
              onClick={() => {
                setIsOpenMenu(!isOpenMenu);
              }}
            >
              Training
            </NavLink>
          </li>
        </ul>
        <div className={css.wrapperBtn}>
          {isLogin && currentUser?.name && (
            <>
              <h3>{currentUser.name}</h3>
              <div className={css.userIcon}>
                <FaUser width={24} height={24} />
              </div>
              <button className={css.btnLogout} onClick={() => logout()}>
                Log Out
                <FaArrowRight width={16} height={16} />
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
