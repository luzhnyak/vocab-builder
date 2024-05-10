import { Outlet } from "react-router-dom";
import { Suspense } from "react";

import Header from "./Header/Header";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Hourglass } from "react-loader-spinner";

export const SharedLayout = () => {
  return (
    <div className="">
      <Header />
      <Suspense
        fallback={
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: "100px",
            }}
            wrapperClass=""
            colors={["#85aa9f", "#a5c0b8"]}
          />
        }
      >
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
