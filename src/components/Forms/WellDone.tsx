import { FC } from "react";

import css from "./EditWordForm.module.css";
import { useWords } from "../../store";
import img1 from "../../images/open-orange-book-floating.png";
import img2 from "../../images/open-orange-book-floating@2x.png";

interface IProps {}

const WellDone: FC<IProps> = () => {
  const { result } = useWords((state) => ({
    result: state.result,
  }));

  const corect = result.filter((item) => item.isDone);
  const mistake = result.filter((item) => !item.isDone);

  return (
    <div className={css.modalWrapper}>
      <h3 className={css.title}>Well done</h3>
      <div className={css.resultWrapper}>
        <div className={css.block}>
          <p className={css.resultTitle}>Сorrect answers:</p>
          <ul className={css.resultList}>
            {corect.map((item) => (
              <li className={css.resultItem}>{item.en}</li>
            ))}
          </ul>
        </div>
        <div className={css.block}>
          <p className={css.resultTitle}>Mistakes:</p>
          <ul className={css.resultList}>
            {mistake.map((item) => (
              <li className={css.resultItem}>{item.en}</li>
            ))}
          </ul>
        </div>
      </div>
      <img
        srcSet={`${img1} 1x, ${img2} 2x`}
        src={img1}
        alt="Vocab Builder"
        className={css.resultImg}
        width="212"
        height="179"
      />
    </div>
  );
};

export default WellDone;
