import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./Components/Home/Home";
import Dashboard from "./Components/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route component={Dashboard} path="/dashboard" />
          <Route component={Home} path="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
