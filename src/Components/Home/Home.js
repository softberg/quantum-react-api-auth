import React from "react";
import Welcome from "./Welcome";
import About from './About';
import Auth from '../Auth/Auth';
import { Route, Switch } from "react-router-dom";
import Header from "./Header";

const Home = () => {
  return (
    <div className="Home">
      <Header />
      <Switch>
        <Route component={Welcome} path="/" exact />
        <Route component={About} path="/about" />
        <Route component={Auth} path="/auth" />
      </Switch>
    </div>
  );
};

export default Home;
