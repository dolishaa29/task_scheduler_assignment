import React from 'react'
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Children } from 'react';
const User = ({children}) => {
  const token = Cookies.get("token");

  if (!token) {
    return <>
     
    <Navigate to="/login"/>
    </>
  }
  return children;
}

export default User
