import { Link, NavLink } from "react-router-dom";
import css from "./Header.module.css";

import logo from "../../icons/logo.svg";

import { useState } from "react";

import { useAuth } from "../../store";

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
          {/* <Logo /> */}
          <img className={css.logoImg} src={logo} />
          VocabBuilder
        </Link>
        <ul
          className={
            isOpenMenu ? [css.menu, css.isShowMenu].join(" ") : css.menu
          }
        >
          <li className={css.menuItem}>
            <NavLink
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
              {/* <button className={css.btnLogin} onClick={() => logout()}>
                <img src={logIn} alt="Log In" width={20} height={20} />
                Log Out
              </button> */}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
