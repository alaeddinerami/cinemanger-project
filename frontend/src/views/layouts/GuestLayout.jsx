import React from "react";
import { Outlet, Link } from "react-router-dom";

const GuestLayout = () => {
  return (
   
      <div>
        <Outlet /> 
      </div>
    
  );
};

export default GuestLayout;
