import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import css from "./EditWordForm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";

import imgUk from "../../icons/uk.svg";
import imgUa from "../../icons/ua.svg";
import { Controller } from "react-hook-form";
import { FC } from "react";
import { useWords } from "../../store";
import { editWord } from "../../services/vocabApi";

type Inputs = {
  en: string;
  ua: string;
};

const editWordSchema = yup.object({
  en: yup.string().required(),
  ua: yup.string().required(),
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
  const { getOwnWords } = useWords((state) => ({
    getOwnWords: state.getOwnWords,
  }));

  const {
    control,
    handleSubmit,
    // setValue,
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
    getOwnWords();
    onClose();
  };

  return (
    <div className={css.modalWrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputWrapper}>
          <div>
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
          <div>
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
