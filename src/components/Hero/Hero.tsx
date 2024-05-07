import css from "./Hero.module.css";
import { FC, PropsWithChildren } from "react";

const Hero: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className={css.wrapper}>
      <ul className={css.list}>
        <li className={css.itemLeft}>{children}</li>
        <li className={css.itemRight}>
          <img
            srcSet="./images/illustration.png, ./images/illustration@2x.png 2x"
            src="./images/illustration.png"
            alt="Vocab Builder"
            className={css.itemRightImg}
          />
          <p className={css.text}>Word · Translation · Grammar · Progress</p>
        </li>
      </ul>
    </section>
  );
};

export default Hero;
