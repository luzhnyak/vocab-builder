import { FC } from "react";
import css from "./Popup.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";

interface IProps {
  setShowEditModal: (value: boolean) => void;
  onClose: () => void;
}

const Popup: FC<IProps> = ({ setShowEditModal, onClose }) => {
  const handleEdit = () => {
    setShowEditModal(true);
    onClose();
  };

  const handleDelete = () => {
    onClose();
  };
  return (
    <div className={css.wrapper}>
      <ul className={css.list}>
        <li>
          <button className={css.btn} onClick={handleEdit}>
            <FaPencilAlt className={css.btnIcon} />
            <span>Edit</span>
          </button>
        </li>
        <li>
          <button className={css.btn} onClick={handleDelete}>
            <FaRegTrashAlt className={css.btnIcon} />
            <span>Delete</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Popup;
