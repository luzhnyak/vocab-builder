import { Link } from "react-router-dom";
import css from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={css.wrapper}>
      <ul className={css.list}>
        <li className={css.itemLeft}>
          <h1 className={css.title}>
            Unlock your potential with the best{" "}
            <span className={css.italic}>language</span> tutors
          </h1>
          <p className={css.text}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <Link className={css.btn} to="teachers">
            Get started
          </Link>
        </li>
        <li className={css.itemRight}></li>
      </ul>
    </section>
  );
};

export default Hero;
