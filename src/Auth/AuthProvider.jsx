import React from "react";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;