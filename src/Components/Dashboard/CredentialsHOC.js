import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Context from "./Context";

const CredentialsHOC = ({ children }) => {
  const history = useHistory();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const checkCredentials = () => {
    const credentials = localStorage.getItem("credentials");

    if (!credentials) {
      history.push("/auth/sign-in");
    } else {
      try {
        JSON.parse(credentials);
      } catch (err) {
        localStorage.removeItem("credentials");
        history.push("/auth/sign-in");
      }
    }
  };

  useEffect(() => {
    checkCredentials();

    // eslint-disable-next-line
  }, []);

  return (
    <Context.Provider
      value={{ 
        isAuthenticated, 
        setIsAuthenticated, 
        userInfo, 
        setUserInfo 
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default CredentialsHOC;
