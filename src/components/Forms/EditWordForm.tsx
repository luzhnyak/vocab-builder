import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import css from "./EditWordForm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";

import imgUk from "../../icons/uk.svg";
import imgUa from "../../icons/ua.svg";

import { FC } from "react";
import { useWords } from "../../store";
import { editWord } from "../../services/vocabApi";

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

interface IProps {
  id: string;
  en: string;
  ua: string;
  category: string;
  isIrregular: boolean;
  onClose: () => void;
}

const EditWordForm: FC<IProps> = ({
  id,
  en,
  ua,
  category,
  isIrregular,
  onClose,
}) => {
  const { setRefresh, refresh } = useWords((state) => ({
    refresh: state.refresh,
    setRefresh: state.setRefresh,
  }));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(editWordSchema),
    defaultValues: {
      en: en,
      ua: ua,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await editWord(id, { en: data.en, ua: data.ua, category, isIrregular });
    setRefresh(!refresh);
    onClose();
  };

  return (
    <div className={css.modalWrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputWrapper}>
          <div className={css.inputWrap}>
            <Controller
              name="ua"
              control={control}
              render={({ field }) => (
                <input type="text" {...field} className={css.input} />
              )}
            />
            {errors && (
              <span className={css.errormessage}>{errors.ua?.message}</span>
            )}
          </div>
          <img src={imgUa} alt="Word" />
          <span>Ukrainian</span>
        </div>

        <div className={css.inputWrapper}>
          <div className={css.inputWrap}>
            <Controller
              name="en"
              control={control}
              render={({ field }) => (
                <input type="text" {...field} className={css.input} />
              )}
            />
            {errors && (
              <span className={css.errormessage}>{errors.en?.message}</span>
            )}
          </div>
          <img src={imgUk} alt="Word" />
          <span>English</span>
        </div>

        <div className={css.btnWrapper}>
          <button type="submit" className={css.btn}>
            Save
          </button>
          <button
            type="button"
            className={css.btnCancel}
            onClick={() => onClose()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditWordForm;
