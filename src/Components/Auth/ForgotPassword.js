import React, { useState } from "react";
import Axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [problems, setProblems] = useState([]);

  const onFormSubmit = e => {
    e.preventDefault();

    if (!email.length) {
      setProblems(["Email is required"]);
    }

    const formData = new FormData();
    formData.set("email", email);

    Axios.post(`/api-forget`, formData)
      .then(({ data }) => {
        if (data.status === "error") {
          setProblems(data.message);
        } else {
          setProblems([data.message]);
        } 
      });
  };

  return (
    <div className="ForgotPassword">
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
        <div className="">
          <label>Email</label>
          <input
            onChange={({ target }) => {
              setEmail(target.value);
            }}
            value={email}
            type="email"
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ForgotPassword;