import css from "./NotFound.module.css";
import { MdScreenSearchDesktop } from "react-icons/md";

const NotFound = () => {
  return (
    <div className={css.wrapper}>
      <MdScreenSearchDesktop className={css.icon} />
      <h3 className={css.title}>No words found</h3>
      <p className={css.text}>Try again</p>
    </div>
  );
};

export default NotFound;
