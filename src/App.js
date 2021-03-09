import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { isLoggedIn } from "./utils/PizzlyUtil"
import Login from "./components/Login"
import Home from "./components/Home"

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </Switch>
        { !isLoggedIn() ? <Redirect to="/login" /> : null}
      </Router>
    </div>
  );
}

export default App;
