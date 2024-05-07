import css from "./Hero.module.css";
import { FC, PropsWithChildren } from "react";
import img1 from "../../images/illustration.png";
import img2 from "../../images/illustration@2x.png";

const Hero: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className={css.wrapper}>
      <ul className={css.list}>
        <li className={css.itemLeft}>{children}</li>
        <li className={css.itemRight}>
          <img
            srcSet={`${img1} 1x, ${img2} 2x`}
            src={img1}
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
