import css from "./Hero.module.css";
import heroImg from "../../images/illustration.png";
import { FC, PropsWithChildren } from "react";

const Hero: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className={css.wrapper}>
      <ul className={css.list}>
        <li className={css.itemLeft}>{children}</li>
        <li className={css.itemRight}>
          <img src={heroImg} alt="Vocab Builder" />
          <p className={css.text}>Word · Translation · Grammar · Progress</p>
        </li>
      </ul>
    </section>
  );
};

export default Hero;
