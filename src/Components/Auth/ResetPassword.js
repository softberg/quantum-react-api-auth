import React from "react";

const ResetPassword = () => {
  return (
    <div className="ResetPassword">
      <form>
      <div className="">
        <label>Password</label>
        <input type="password" />
      </div>
      <div className="">
        <label>Repeat password</label>
        <input type="password" />
      </div>
      <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ResetPassword;
