import React from "react";
import { Link } from "react-router-dom";
const Welcome = () => {
  return (
    <div className="Welcome">
      <p>
        Very fast and extremely simple PHP MVC framework of the next generation
        with a modular structure that allows you to create any projects
      </p>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/auth/sign-in">Sign In</Link>
        </li>
      </ul>
      <a
        href="https://quantum.softberg.org/en"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn more
      </a>
    </div>
  );
};

export default Welcome;