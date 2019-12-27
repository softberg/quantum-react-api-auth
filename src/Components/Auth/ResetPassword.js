import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Axios from "axios";

const ResetPassword = () => {
  const history = useHistory();
  const params = useParams();

  const [password, setPassword] = useState({
    password: "",
    rePassword: ""
  });
  const [problems, setProblems] = useState([]);

  const onFormSubmit = e => {
    e.preventDefault();

    let errors = [];

    if(!password.password){
      errors.push('Password is required');
    }

    if(password.password.length < 6){
      errors.push('Minimum password length must be 6');
    }

    if(!password.rePassword){
      errors.push('Repeat password is required');
    }

    if(password.password !== password.rePassword){
      errors.push('Password must match Repeat passsword');
    }

    setProblems(errors);
    if(errors.length){
      return
    }

    let formData = new FormData();

    formData.set('password', password.password);

    Axios.post(`/api-reset/${params.reset_token}`,formData)
      .then(({ data }) =>{
        if(data.status === 'error'){
          setProblems([`Some thing wrong`]);
        }else{
          history.push('/auth/sign-in');
        }
      })
    
  };

  return (
    <div className="ResetPassword">
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
          <label>Password</label>
          <input
            value={password.password}
            onChange={({ target }) => {
              setPassword({ ...password, password: target.value });
            }}
            type="password"
          />
        </div>
        <div className="">
          <label>Repeat password</label>
          <input
            value={password.rePassword}
            onChange={({ target }) => {
              setPassword({ ...password, rePassword: target.value });
            }}
            type="password"
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ResetPassword;
