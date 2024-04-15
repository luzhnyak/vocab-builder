import LoginForm from "../components/Forms/LoginForm";
import Hero from "../components/Hero/Hero";

const LoginPage = () => {
  return (
    <main className="container">
      <Hero>
        <LoginForm />
      </Hero>
    </main>
  );
};

export default LoginPage;
