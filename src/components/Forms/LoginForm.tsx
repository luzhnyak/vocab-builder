import { FC, useState } from "react";
import css from "./Form.module.css";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
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

  const { signin } = useAuth((state) => ({
    signin: state.signin,
  }));

  const handleSubmit = async (
    values: SubmitValues,
    { resetForm }: FormikHelpers<SubmitValues>
  ) => {
    signin(values);
    resetForm();
  };

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Login</h3>
      <p className={css.text}>
        Please enter your login details to continue using our service:
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
      <Link className={css.register} to="/register">
        Register
      </Link>
    </div>
  );
};

export default LoginForm;
