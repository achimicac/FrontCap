import React, { useContext, useDebugValue } from "react";
import AuthContext from "./AuthContext";

const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  return { auth, setAuth };
};

export default useAuth;

// import { useContext, useDebugValue, useState } from "react";
// import AuthContext from "./AuthProvider";

// const useAuth = () => {
//   const { auth, setAuth } = useContext(AuthContext);
//   useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));
//   return { auth, setAuth };
// };

// const setAuthen = (value) => {
//   const { auth, setAuth } = useContext(AuthContext);
//   setAuth(value);
// };

// export default setAuthen;
