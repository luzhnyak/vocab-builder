import { FC, useState } from "react";
import css from "./Form.module.css";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as yup from "yup";
import eye from "../../images/eye.svg";
import eyeOff from "../../images/eye-off.svg";

import { useAuth } from "../../store";
import { toast } from "react-toastify";

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(30).required(),
});

export interface SubmitValues {
  email: string;
  password: string;
}

const initialValues: SubmitValues = {
  email: "",
  password: "",
};

const LoginForm: FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth((state) => ({
    login: state.login,
  }));

  const handleSubmit = async (
    values: SubmitValues,
    { resetForm }: FormikHelpers<SubmitValues>
  ) => {
    resetForm();
  };

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Login</h3>
      <p className={css.text}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, values }) => (
          <Form>
            <div className={css.inputWrapper}>
              <Field
                className={`${css.input} ${errors.email ? css.inputError : ""}`}
                type="email"
                name="email"
                placeholder="Email"
                value={values.email}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.errormessage}
              />
            </div>
            <div className={css.inputWrapper}>
              <Field
                className={`${css.input} ${
                  errors.password ? css.inputError : ""
                }`}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={values.password}
              />
              <ErrorMessage
                name="password"
                component="div"
                className={css.errormessage}
              />
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
