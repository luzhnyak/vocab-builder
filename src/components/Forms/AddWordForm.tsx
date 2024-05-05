import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import css from "./EditWordForm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { HFInput } from "./HFInput";
import uk from "../../icons/uk.svg";
import ua from "../../icons/ua.svg";
import { Control, Controller } from "react-hook-form";

type Inputs = {
  en: string;
  ua: string;
};

const editWordSchema = yup.object({
  en: yup.string().required(),
  ua: yup.string().required(),
});

const EditWordForm = () => {
  const {
    control,
    handleSubmit,
    // setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(editWordSchema),
    defaultValues: {
      en: "",
      ua: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div className={css.modalWrapper}>
      <h3 className={css.title}>Login</h3>
      <p className={css.text}>
        Please enter your login details to continue using our service:
      </p>
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
          <img src={ua} alt="Word" />
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
          <img src={uk} alt="Word" />
          <span>English</span>
        </div>

        <div className={css.btnWrapper}>
          <button type="submit" className={css.btn}>
            Save
          </button>
          <button type="button" className={css.btn}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditWordForm;
