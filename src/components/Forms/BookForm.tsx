import { FC } from "react";
import css from "./Form.module.css";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

const bookSchema = yup.object({
  options: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
});

export interface SubmitValues {
  options: string;
  name: string;
  email: string;
  phone: string;
}

const initialValues: SubmitValues = {
  options: "",
  name: "",
  email: "",
  phone: "",
};

type Props = {
  setShowBook: (value: boolean) => void;
};

const BookForm: FC<Props> = ({ setShowBook }) => {
  const handleSubmit = (
    values: SubmitValues,
    { resetForm }: FormikHelpers<SubmitValues>
  ) => {
    console.log("values", values);
    setShowBook(false);
    toast.info("Trial lesson booked!");
    resetForm();
  };

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Book trial lesson</h3>
      <p className={css.text}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>
      <p className={css.reason}>
        What is your main reason for learning English?
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={bookSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, values }) => (
          <Form>
            <div className={css.radioWrapper}>
              <Field
                className={css.inputRadio}
                type="radio"
                id="option-1"
                value="option-1"
                name="options"
              />
              <label htmlFor="option-1">Career and business</label>
            </div>

            <div className={css.radioWrapper}>
              <Field
                className={css.inputRadio}
                type="radio"
                id="option-2"
                value="option-2"
                name="options"
              />
              <label htmlFor="option-2">Lesson for kids</label>
            </div>

            <div className={css.radioWrapper}>
              <Field
                className={css.inputRadio}
                type="radio"
                id="option-3"
                value="option-3"
                name="options"
              />
              <label htmlFor="option-3">Living abroad</label>
            </div>

            <div className={css.radioWrapper}>
              <Field
                className={css.inputRadio}
                type="radio"
                id="option-4"
                value="option-4"
                name="options"
              />
              <label htmlFor="option-4">Exams and coursework</label>
            </div>

            <div className={css.radioWrapper}>
              <Field
                className={css.inputRadio}
                type="radio"
                id="option-5"
                value="option-5"
                name="options"
              />
              <label htmlFor="option-5">Culture, travel or hobby</label>
            </div>
            <ErrorMessage
              name="options"
              component="div"
              className={css.errormessage}
            />
            <div className={css.inputWrapper}>
              <Field
                className={`${css.input} ${errors.name ? css.inputError : ""}`}
                type="text"
                placeholder="Full Name"
                name="name"
                value={values.name}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={css.errormessage}
              />
            </div>
            <div className={css.inputWrapper}>
              <Field
                className={`${css.input} ${errors.email ? css.inputError : ""}`}
                type="email"
                placeholder="Email"
                name="email"
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
                className={`${css.input} ${errors.phone ? css.inputError : ""}`}
                type="text"
                placeholder="Phone number"
                name="phone"
                value={values.phone}
              />
              <ErrorMessage
                name="phone"
                component="div"
                className={css.errormessage}
              />
            </div>
            <button className={css.btn} type="submit">
              Book
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookForm;
