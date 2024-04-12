import { Outlet } from "react-router-dom";
import { Suspense } from "react";

import Header from "./Header/Header";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const SharedLayout = () => {
  return (
    <div className="">
      <Header />
      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />
    </div>
  );
};
