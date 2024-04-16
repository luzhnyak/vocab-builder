import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";

import { SharedLayout } from "./components/SharedLayout";
import { PrivateRoute } from "./pages/PrivateRoute";
import RecommendPage from "./pages/RecommendPage";
import TrainingPage from "./pages/TrainingPage";
import DictonaryPage from "./pages/DictonaryPage";

const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        {/* <Route
          index
          element={<PrivateRoute component={<HomePage />} redirectTo="/" />}
        /> */}
        <Route index element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/dictionary" element={<DictonaryPage />}></Route>
        <Route path="/recomend" element={<RecommendPage />}></Route>
        <Route path="/training" element={<TrainingPage />}></Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default App;
