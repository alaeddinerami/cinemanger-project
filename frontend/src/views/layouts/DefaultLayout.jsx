  import React from "react";
  import { Outlet, Link, Navigate } from "react-router-dom";

  const DefaultLayout = () => {
    const isAuthenticated = localStorage.getItem("token"); 

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return (
      <>
      <div>
        <div>
          <Outlet />
        </div>
      </div>
      </>
    );
  };

  export default DefaultLayout;
