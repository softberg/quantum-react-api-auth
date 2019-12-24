import React from "react";
import { Route, Switch } from "react-router-dom";
import CredentialsHOC from "./CredentialsHOC";

import Header from "./Header";

import Logo from "../../Images/quantum-logo.png";

import Home from "./Pages/Home";
import Post from "./Pages/Post";
import Posts from "./Pages/Posts";
import Single from "./Pages/Single";

const Dashboard = () => {
  return (
    <CredentialsHOC>
      <div className="Dashboard">
        <Header />
        <div className="content">
          <img src={Logo} alt="" className="logo" />
          <Switch>
            <Route path="/dashboard" exact component={Home} />
            <Route path="/dashboard/posts" exact component={Posts} />
            <Route path="/dashboard/single/:id" exact component={Single} />
            <Route path="/dashboard/new-post" exact component={Post} />
          </Switch>
        </div>
      </div>
    </CredentialsHOC>
  );
};

export default Dashboard;
