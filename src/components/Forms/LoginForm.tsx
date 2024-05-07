import { FC, useState } from "react";
import css from "./Form.module.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import eye from "../../icons/eye.svg";
import eyeOff from "../../icons/eye-off.svg";

import { useAuth } from "../../store";
// import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(30).required(),
});

type Inputs = {
  email: string;
  password: string;
};

const LoginForm: FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { signin } = useAuth((state) => ({
    signin: state.signin,
  }));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    signin(data);
  };

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Login</h3>
      <p className={css.text}>
        Please enter your login details to continue using our service:
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputWrapper}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input type="text" {...field} className={css.input} />
            )}
          />
          {errors && (
            <span className={css.errormessage}>{errors.email?.message}</span>
          )}
        </div>
        <div className={css.inputWrapper}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input type="text" {...field} className={css.input} />
            )}
          />
          {errors && (
            <span className={css.errormessage}>{errors.email?.message}</span>
          )}

          <button
            type="button"
            className={css.btnShowPassword}
            onClick={() => setShowPassword(!showPassword)}
          >
            <img src={showPassword ? eye : eyeOff} alt="ShowPassword" />
          </button>
        </div>
        <button className={css.btn} type="submit">
          Log In
        </button>
      </form>

      <Link className={css.register} to="/register">
        Register
      </Link>
    </div>
  );
};

export default LoginForm;
