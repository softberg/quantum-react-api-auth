import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="SignIn">
      <form>
        <div>
          <label>Email</label>
          <input />
        </div>
        <div>
          <label>Password</label>
          <input type="password" />
        </div>
        <div className="actions">
          <Link to="/auth/sign-up">Sign Up</Link>
          <Link to="/auth/forgot-password">Forgot Password?</Link>
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
