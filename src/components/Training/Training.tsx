import { useEffect, useState } from "react";
import css from "./Training.module.css";
import arrowRight from "../../icons/switch-horizontal.svg";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import imgUk from "../../icons/uk.svg";
import imgUa from "../../icons/ua.svg";
import CircularProgress from "../Progress/CircularProgress";
import { useWords } from "../../store";
import { Answer } from "../../types";

import Modal from "../Modal/Modal";
import WellDone from "../Forms/WellDone";

type Inputs = {
  en: string;
  ua: string;
};

const editWordSchema = yup.object({
  en: yup
    .string()
    .required("Field must not be empty")
    .matches(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/, "Field must be English"),
  ua: yup
    .string()
    .required("Field must not be empty")
    .matches(/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u, "Field must be Ukrainian"),
});

// const editWordSchema = yup.object({
//   answerWord: yup.string().required("This is a required field"),
// });

const Training = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [inx, setInx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const { tasks, addAnswer, result } = useWords((state) => ({
    tasks: state.tasks,
    addAnswer: state.addAnswer,
    result: state.result,
  }));

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(editWordSchema),
    defaultValues: {
      en: "",
      ua: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(tasks.length, inx);
    if (answers.length === tasks.length) return;

    setAnswers([
      ...answers,
      {
        _id: tasks[inx]._id,
        ua: data.ua,
        en: data.en,
        task: tasks[inx].task,
      },
    ]);

    if (tasks.length !== 0) {
      setProgress(Math.round(((inx + 1) * 100) / tasks.length));
    }

    if (inx >= tasks.length - 1) {
      return;
    }
    setInx(inx + 1);

    reset();
  };

  const onSubmitAll = async () => {
    handleSubmit(onSubmit);
    addAnswer(answers);
    setAnswers([]);
    setInx(0);
    setProgress(0);
    reset();
    setShowModal(true);
  };

  const handleCancel = () => {
    setAnswers([]);
    setInx(0);
    setProgress(0);
    reset();
  };

  useEffect(() => {
    if (tasks[inx].task === "ua") {
      setValue("en", tasks[inx].en || "");
      setValue("ua", "");
    } else {
      setValue("en", "");
      setValue("ua", tasks[inx].ua || "");
    }
  }, [setValue, inx, tasks]);

  return (
    <div className={css.wrapper}>
      <div className={css.progress}>
        <CircularProgress
          size={58}
          strokeWidth={5}
          progress={progress}
          withText={true}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.blockWrapper}>
          <div className={css.uaBlock}>
            <div className={css.inputWrapper}>
              <div className={css.textareaWrapper}>
                {tasks[inx].task === "en" && (
                  <>
                    <Controller
                      name="en"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          className={css.input}
                          placeholder="Введіть переклад"
                        />
                      )}
                    />
                    {errors && (
                      <span className={css.errormessage}>
                        {errors.en?.message}
                      </span>
                    )}
                  </>
                )}
                {tasks[inx].task === "ua" && (
                  <>
                    <Controller
                      name="ua"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          className={css.input}
                          placeholder="Введіть переклад"
                        />
                      )}
                    />
                    {errors && (
                      <span className={css.errormessage}>
                        {errors.ua?.message}
                      </span>
                    )}
                  </>
                )}
              </div>

              <div className={css.labelWrapper}>
                {tasks[inx].task === "ua" ? (
                  <>
                    <img src={imgUa} alt="Word" />
                    <span>Ukrainian</span>
                  </>
                ) : (
                  <>
                    <img src={imgUk} alt="Word" />
                    <span>English</span>
                  </>
                )}
              </div>
            </div>
            {answers.length !== tasks.length && (
              <button type="submit" className={css.btnNext}>
                Next
                <img src={arrowRight} alt="" />
              </button>
            )}
          </div>
          <div className={css.enBlock}>
            <div className={css.inputWrapper}>
              <div>
                <p className={css.taskWord}>
                  {tasks.length > 0 && tasks[inx].task === "ua"
                    ? tasks[inx]?.en
                    : tasks[inx]?.ua}
                </p>
              </div>
              <div className={css.labelWrapper}>
                {tasks[inx].task === "en" ? (
                  <>
                    <img src={imgUa} alt="Word" />
                    <span>Ukrainian</span>
                  </>
                ) : (
                  <>
                    <img src={imgUk} alt="Word" />
                    <span>English</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className={css.btnWrapper}>
        <button type="submit" className={css.btn} onClick={onSubmitAll}>
          Save
        </button>
        <button type="button" className={css.btnCancel} onClick={handleCancel}>
          Cancel
        </button>
      </div>
      {showModal && result?.length !== 0 && (
        <Modal onClose={() => setShowModal(false)}>
          <WellDone />
        </Modal>
      )}
    </div>
  );
};

export default Training;
