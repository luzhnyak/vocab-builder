import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";

import { SharedLayout } from "./components/SharedLayout";
import { PrivateRoute } from "./pages/PrivateRoute";
import RecommendPage from "./pages/RecommendPage";
import TrainingPage from "./pages/TrainingPage";
import DictonaryPage from "./pages/DictonaryPage";
import { RestrictedRoute } from "./pages/RestrictedRoute";
import { useAuth } from "./store";
import { setToken } from "./services/vocabApi";

// const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));

const App = () => {
  const { isLogin, currentUser } = useAuth((state) => ({
    isLogin: state.isLogin,
    currentUser: state.currentUser,
  }));

  useEffect(() => {
    if (isLogin && currentUser?.token) {
      console.log(currentUser.token);

      setToken(currentUser.token);
    }
  }, [currentUser, isLogin]);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route
          index
          element={
            <RestrictedRoute
              component={<LoginPage />}
              redirectTo="/dictionary"
            />
          }
        ></Route>
        <Route
          path="/register"
          element={
            <RestrictedRoute
              component={<RegisterPage />}
              redirectTo="/dictionary"
            />
          }
        ></Route>
        <Route path="/dictionary" element={<DictonaryPage />}></Route>
        <Route path="/recomend" element={<RecommendPage />}></Route>
        <Route
          path="/training"
          element={<PrivateRoute component={<TrainingPage />} redirectTo="/" />}
        ></Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default App;
