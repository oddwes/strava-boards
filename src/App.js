import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, Link } from "react-router-dom";
import { isLoggedIn } from "./utils/PizzlyUtil"
import Login from "./components/Login"
import Activities from "./components/activities/Activities"
import Goals from "./components/Goals"

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const headerLinks = () => {
    if(isLoggedIn()) {
      return (
        <React.Fragment>
          <Link to="/" style={{textDecoration: "none", color: "white", display: "inline-block"}}><h3>Statistics |</h3></Link>
          <Link to="/activities" className="pl-2" style={{textDecoration: "none", color: "white", display: "inline-block"}}><h3>Activities |</h3></Link>
          <Link to="/goals" className="pl-2" style={{textDecoration: "none", color: "white", display: "inline-block"}}><h3>Goals</h3></Link>
        </React.Fragment>
      )
    }
  }

  return (
    <div className="App">
      <Router>
        <div className="strava-header py-4">
          <h1>THE BEST STRAVA DASHBOARD EVER</h1>
          {headerLinks()}
        </div>
        <br />
        <Switch>
          <Route exact path="/activities" component={Activities} />
          <Route exact path="/goals" component={Goals} />
          <Route exact path="/login" component={Login} />
        </Switch>
        { !isLoggedIn() ? <Redirect to="/login" /> : null}
      </Router>
    </div>
  );
}

export default App;
