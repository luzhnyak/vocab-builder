import { FC } from "react";

import css from "./EditWordForm.module.css";
import { useWords } from "../../store";

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
        <div>
          <p className={css.resultTitle}>Сorrect answers:</p>
          <ul className={css.resultList}>
            {corect.map((item) => (
              <li className={css.resultItem}>{item.en}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className={css.resultTitle}>Mistakes:</p>
          <ul className={css.resultList}>
            {mistake.map((item) => (
              <li className={css.resultItem}>{item.en}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WellDone;
