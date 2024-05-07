import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";

import { SharedLayout } from "./components/SharedLayout";
import { PrivateRoute } from "./pages/PrivateRoute";
import { RestrictedRoute } from "./pages/RestrictedRoute";
import { useAuth } from "./store";
import { setToken } from "./services/vocabApi";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const DictonaryPage = lazy(() => import("./pages/DictonaryPage"));
const RecommendPage = lazy(() => import("./pages/RecommendPage"));
const TrainingPage = lazy(() => import("./pages/TrainingPage"));

const App = () => {
  const { isLogin, currentUser } = useAuth((state) => ({
    isLogin: state.isLogin,
    currentUser: state.currentUser,
    getCurrentUser: state.getCurrentUser,
  }));

  useEffect(() => {
    if (isLogin && currentUser?.token) {
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
        <Route
          path="/dictionary"
          element={
            <PrivateRoute component={<DictonaryPage />} redirectTo="/" />
          }
        ></Route>
        <Route
          path="/recomend"
          element={
            <PrivateRoute component={<RecommendPage />} redirectTo="/" />
          }
        ></Route>
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
