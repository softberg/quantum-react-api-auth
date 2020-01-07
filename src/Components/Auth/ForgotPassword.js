import React, { useState } from "react";
import Axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("none");
  const [problems, setProblems] = useState([]);
  const [success, setSuccess] = useState([]);

  const onFormSubmit = e => {
    e.preventDefault();

    if (!email.length) {
      setProblems(["Email is required"]);
    }

    const formData = new FormData();
    formData.set("email", email);

    Axios.post(`/api-forget`, formData).then(({ data }) => {
      if (data.status === "error") {
        setStatus('problems');
        setProblems([data.message]);
      } else {
        setStatus('success');
        setSuccess([data.message]);
      }
    });
  };

  return (
    <div className="ForgotPassword">
      <div
        className="logs"
        style={{ display: (status !== 'none') ? "block" : "none" }}
      >
        {status === "problems" && (
          <ul className="problems">
            {problems.map((problem, key) => (
              <li key={key}>{problem}</li>
            ))}
          </ul>
        )}

        {status === "success" && (
          <ul className="success">
            {success.map((message, key) => (
              <li key={key}>{message}</li>
            ))}
          </ul>
        )}
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