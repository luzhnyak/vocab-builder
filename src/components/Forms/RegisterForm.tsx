import { FC, useState } from "react";
import css from "./Form.module.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import eye from "../../icons/eye.svg";
import eyeOff from "../../icons/eye-off.svg";

import { useAuth } from "../../store";
import { Link } from "react-router-dom";

const registerSchema = yup.object({
  name: yup.string().min(2).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(30).required(),
});

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm: FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { signup } = useAuth((state) => ({
    signup: state.signup,
  }));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    signup(data);
  };

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Register</h3>
      <p className={css.text}>
        To start using our services, please fill out the registration form
        below. All fields are mandatory:
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputWrapper}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className={css.input}
                placeholder="Name"
              />
            )}
          />
          {errors && (
            <span className={css.errormessage}>{errors.name?.message}</span>
          )}
        </div>
        <div className={css.inputWrapper}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className={css.input}
                placeholder="Email"
              />
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
              <input
                type="text"
                {...field}
                className={css.input}
                placeholder="Password"
              />
            )}
          />
          {errors && (
            <span className={css.errormessage}>{errors.password?.message}</span>
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
          Register
        </button>
      </form>

      <Link className={css.register} to="/login">
        Login
      </Link>
    </div>
  );
};

export default RegisterForm;
