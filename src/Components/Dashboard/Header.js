import React from "react";
import { Link, useHistory } from "react-router-dom";
import pajax from "../../pajax";

const Header = () => {
  const history = useHistory();

  const logout = () => {
    pajax({ url: `/api-signout`, method: "get" }).then(() => {
      localStorage.removeItem("credentials");
      history.push("/");
    }).catch(() => {
      console.log(`There are error with credentials :/`)
    })
  };

  return (
    <div className="Header">
      <Link to="/dashboard/">Home</Link>
      <Link to="/dashboard/posts">Posts</Link>
      <Link to="/dashboard/new-post">New Post</Link>
      
      <div className="profile">
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
