import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const CredentialsHOC = ({ children }) => {
  const history = useHistory();

  const checkCredentials = () => {
    const credentials = localStorage.getItem("credentials");

    if (!credentials) {
      history.push("/auth/sign-in");
    } else {
      try {
        JSON.parse(credentials);
      } catch (err) {
        history.push("/auth/sign-in");
      }
    }
  };

  useEffect(() => {
    checkCredentials();

    // eslint-disable-next-line
  }, []);
  

  return children;
};

export default CredentialsHOC;
