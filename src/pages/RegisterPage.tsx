import RegisterForm from "../components/Forms/RegisterForm";
import Hero from "../components/Hero/Hero";

const RegisterPage = () => {
  return (
    <main className="container">
      <Hero>
        <RegisterForm />
      </Hero>
    </main>
  );
};

export default RegisterPage;
