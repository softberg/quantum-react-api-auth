import React from "react";
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="SignUp">
      <form>
        <div className="">
          <label>Email</label>
          <input type="email" />
        </div>
        <div className="">
          <label>Password</label>
          <input type="password" />
        </div>
        <div className="">
          <label>First name</label>
          <input type="text" />
        </div>
        <div className="">
          <label>Last name</label>
          <input type="text" />
        </div>
        <div className="actions">
          <Link to="/auth/sign-in">Sign In</Link>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
