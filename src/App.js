import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Components/Home/Home";
import Dashboard from "./Components/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Route component={Home} path="/" />
        <Route component={Dashboard} path="/dashboard" />
      </Router>
    </div>
  );
}

export default App;
