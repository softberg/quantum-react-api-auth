import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import Logo from "../../Images/quantum-logo.png";

const Header = () => {
  const history = useHistory();
  const [title, setTitle] = useState("Quantum PHP Framework");

  useEffect(() => {
    history.listen(({ pathname }) => {
      // eslint-disable-next-line
      switch (pathname) {
        case "/":
          setTitle("Quantum PHP Framework");
          break;
        case "/about":
          setTitle("About");
          break;
        case "/auth/sign-in":
          setTitle("Sign In");
          break;
        case "/auth/sign-up":
          setTitle("Sign Up");
          break;
        case "/auth/reset-password":
          setTitle("Reset password");
          break;
      }
    });

    // eslint-disable-next-line
  }, []);

  return (
    <div className="Header">
      <img alt="" src={Logo} />
      <h1 className="page-title">{title}</h1>
    </div>
  );
};

export default Header;
