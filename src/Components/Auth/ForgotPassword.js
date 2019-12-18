import React from "react";

const ForgotPassword = () => {
  return (
    <div className="ForgotPassword">
      <form>
        <div className="">
          <label>Email</label>
          <input type="email" />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
