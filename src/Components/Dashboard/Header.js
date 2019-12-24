import React from "react";
import { Link, useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("credentials");
    history.push("/");
  };

  return (
    <div className="Header">
      <Link to="/dashboard/">Home</Link>
      <Link to="/dashboard/posts">Posts</Link>
      <Link to="/dashboard/new-post">New Post</Link>
      
      <div className="profile">
        <button onClick={logout} className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default Header;
