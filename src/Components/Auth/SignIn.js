import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Axios from "axios";

const SignIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [problems, setProblems] = useState([]);

  const onFormSubmit = e => {
    e.preventDefault();

    const formData = new FormData();

    formData.set("email", email);
    formData.set("password", password);

    Axios.post(`/api-signin`, formData).then(({ data }) => {
      if (data.status === "success") {
        const JWTToken = atob(data.data.tokens.access_token);

        const jwtData = JSON.parse(atob(JWTToken.split('.')[1]));

        localStorage.setItem('userInfo', JSON.stringify({
          username:jwtData.data.username,
          firstname:jwtData.data.firstname,
          lastname:jwtData.data.lastname,
          role:jwtData.data.role
        }));
        
        localStorage.setItem("credentials", JSON.stringify(data.data.tokens));

        history.push("/dashboard");
      } else {
        setProblems([`Invalid Email or Password`]);
      }
    });
  };

  return (
    <div className="SignIn">
      <div
        className="logs"
        style={{ display: problems.length ? "block" : "none" }}
      >
        <ul>
          {problems.map((problem, key) => (
            <li key={key}>{problem}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={onFormSubmit}>
        <div>
          <label>Email</label>
          <input
            value={email}
            onChange={({ target }) => {
              setEmail(target.value);
            }}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
            }}
            type="password"
          />
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
