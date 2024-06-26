import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import css from "./EditWordForm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";

import uk from "../../icons/uk.svg";
import ua from "../../icons/ua.svg";
import { Controller } from "react-hook-form";
import { useWords } from "../../store";
import { createWord } from "../../services/vocabApi";

type Inputs = {
  en: string;
  ua: string;
  category: string;
  isIrregular: boolean;
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
  category: yup.string().required(),
  isIrregular: yup.boolean().required(),
});

interface IProps {
  onClose: () => void;
}

const AddWordForm: FC<IProps> = ({ onClose }) => {
  const [showRadio, setShowRadio] = useState(true);

  const { categories, refresh, setRefresh } = useWords((state) => ({
    categories: state.categories,
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
      en: "",
      ua: "",
      category: "verb",
      isIrregular: false,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.category !== "verb") {
      await createWord({ en: data.en, ua: data.ua, category: data.category });
    } else {
      await createWord(data);
    }

    setRefresh(!refresh);
    onClose();
  };

  const handleSelectChange = (value: string) => {
    if (value === "verb") {
      setShowRadio(true);
    } else {
      setShowRadio(false);
    }
  };

  return (
    <div className={css.modalWrapper}>
      <h3 className={css.title}>Add word</h3>
      <p className={css.text}>
        Adding a new word to the dictionary is an important step in enriching
        the language base and expanding the vocabulary.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputWrapper}>
          <div>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className={css.select}
                  onChange={(e) => {
                    field.onChange(e);
                    handleSelectChange(e.target.value);
                  }}
                >
                  {categories?.map((item) => {
                    return (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              )}
            />
          </div>
        </div>

        <div className={css.inputWrapper}>
          {showRadio && (
            <div>
              <Controller
                name="isIrregular"
                control={control}
                render={({ field }) => (
                  <div className={css.radioGroup}>
                    <div className={css.radioWrapper}>
                      <input
                        {...field}
                        className={css.inputRadio}
                        type="radio"
                        id="option-1"
                        value={"false"}
                        checked
                      />
                      <label htmlFor="option-1" className={css.label}>
                        Regular
                      </label>
                    </div>
                    <div className={css.radioWrapper}>
                      <input
                        {...field}
                        className={css.inputRadio}
                        type="radio"
                        id="option-2"
                        value={"true"}
                      />
                      <label htmlFor="option-2" className={css.label}>
                        Irregular
                      </label>
                    </div>
                  </div>
                )}
              />
              {errors && (
                <span className={css.errormessage}>
                  {errors.isIrregular?.message}
                </span>
              )}
            </div>
          )}
        </div>
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
          <img src={ua} alt="Word" />
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
          <img src={uk} alt="Word" />
          <span>English</span>
        </div>

        <div className={css.btnWrapper}>
          <button type="submit" className={css.btn}>
            Save
          </button>
          <button type="button" className={css.btn} onClick={() => onClose()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWordForm;
