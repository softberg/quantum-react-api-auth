import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";

const Auth = () => {
  const history = useHistory();

  useEffect(() => {
    history.push("/auth/sign-in");

    history.listen(({ pathname }) => {
      if(pathname === '/auth'){
        history.push('/');
      }
    });

    // eslint-disable-next-line
  }, []);

  return (
    <div className="Auth">
      <Route path="/auth/sign-in" exact component={SignIn} />
      <Route path="/auth/sign-up" exact component={SignUp} />
      <Route path="/auth/forgot-password" exact component={ForgotPassword} />
    </div>
  );
};

export default Auth;
