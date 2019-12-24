import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from 'axios';

const formTemplate = {
  Email: "",
  Password: "",
  "Repeat Password": "",
  "First Name": "",
  "Last Name": ""
};

const SignUp = () => {
  const history = useHistory();
  const [form, setForm] = useState(formTemplate);
  const [problems, setProblems] = useState([]);

  const formValidation = () => {
    let validationMessages = [];

    for (let field in form) {
      if (!form[field]) {
        validationMessages.push(`${field} is required`);
      }
    }

    if (form.password !== form.rePassword) {
      validationMessages.push(`Password and Repeat Password does not math`);
    }

    setProblems(validationMessages);

    if (validationMessages.length) {
      return false;
    }

    return true;
  };

  const onInputChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value
    });
  };

  const onFormSubmit = e => {
    e.preventDefault();

    let formIsValid = formValidation();

    if (!formIsValid) {
      return;
    }

    let formData = new FormData();

    formData.set('username', form['Email'])
    formData.set('password', form['Password'])
    formData.set('firstname', form['First Name'])
    formData.set('lastname', form['Last Name'])

    Axios.post(`/api-signup`, formData).then(({ data }) => {
      if (data.status === "success") {
        history.push("/auth/sign-in");
      } else {
        setProblems(['Email allready registered']);
      }
    });
    

  };

  return (
    <div className="SignUp">
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
            onChange={onInputChange}
            name="Email"
            type="email"
            value={form.email}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            onChange={onInputChange}
            name="Password"
            type="password"
            value={form.password}
          />
        </div>
        <div>
          <label>Repeat Password</label>
          <input
            onChange={onInputChange}
            name="Repeat Password"
            type="password"
            value={form.password}
          />
        </div>
        <div>
          <label>First name</label>
          <input
            onChange={onInputChange}
            name="First Name"
            type="text"
            value={form.firstName}
          />
        </div>
        <div>
          <label>Last name</label>
          <input
            onChange={onInputChange}
            name="Last Name"
            type="text"
            value={form.lastName}
          />
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
