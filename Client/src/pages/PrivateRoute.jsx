import React from 'react'
import { Outlet, Navigate } from "react-router-dom";

const PrivatePages = () => {
  console.log(!localStorage.getItem("Blog-Token") || !localStorage.getItem("isAuth"))
    if (!localStorage.getItem("Blog-Token") || !localStorage.getItem("isAuth")) {
        return <Navigate to="/login" />;
      }else{
        return <Outlet />;
      }
    
}

export default PrivatePages