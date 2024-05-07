import { useState } from "react";
import { Link } from "react-router-dom";
import css from "./Training.module.css";
import Modal from "../Modal/Modal";
import AddWordForm from "../Forms/AddWordForm";

const TrainingEmpty = () => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className={css.emptyWrapper}>
      <div>
        <h1>You don't have a single word to learn right now. </h1>
        <p>
          Please create or add a word to start the workout. We want to improve
          your vocabulary and develop your knowledge, so please share the words
          you are interested in adding to your study.
        </p>
        <div className={css.btnWrapper}>
          <button
            type="submit"
            className={css.btn}
            onClick={() => setShowEditModal(true)}
          >
            Add word
          </button>
          <Link className={css.btnCancel} to="/dictionary">
            Cancel
          </Link>
        </div>
      </div>
      <img
        srcSet="./images/blood-report.png, ./images/blood-report@2x.png 2x"
        src="./images/blood-report.png"
        alt="blood report"
        width="265"
        height="283"
        className={css.img}
      />
      {showEditModal && (
        <Modal onClose={setShowEditModal}>
          <AddWordForm onClose={() => setShowEditModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default TrainingEmpty;
