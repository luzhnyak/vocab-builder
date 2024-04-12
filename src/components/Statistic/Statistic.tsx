import css from "./Statistic.module.css";

const Statistic = () => {
  return (
    <section className={css.wrapper}>
      <ul className={css.list}>
        <li className={css.item}>
          <span className={css.number}>32,000&nbsp;+</span>
          <span className={css.desc}>Experienced tutors</span>
        </li>
        <li className={css.item}>
          <span className={css.number}>300,000&nbsp;+</span>
          <span className={css.desc}>5-star tutor reviews</span>
        </li>
        <li className={css.item}>
          <span className={css.number}>120&nbsp;+</span>
          <span className={css.desc}>Subjects taught</span>
        </li>
        <li className={css.item}>
          <span className={css.number}>200&nbsp;+</span>
          <span className={css.desc}>Tutor nationalities</span>
        </li>
      </ul>
    </section>
  );
};

export default Statistic;
