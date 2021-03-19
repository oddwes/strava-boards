import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, Link } from "react-router-dom";
import { isLoggedIn } from "./utils/PizzlyUtil"
import Login from "./components/Login"
import Home from "./components/Home"
import Goals from "./components/Goals"

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <div className="strava-header py-4">
          <h1>THE BEST STRAVA DASHBOARD EVER</h1>
          <div>
            <Link to="/" style={{textDecoration: "none", color: "white", display: "inline-block"}}><h3>Statistics |</h3></Link>
            <Link to="/goals" className="pl-2" style={{textDecoration: "none", color: "white", display: "inline-block"}}><h3>Goals</h3></Link>
          </div>
        </div>
        <br />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/goals" component={Goals} />
          <Route exact path="/login" component={Login} />
        </Switch>
        { !isLoggedIn() ? <Redirect to="/login" /> : null}
      </Router>
    </div>
  );
}

export default App;
