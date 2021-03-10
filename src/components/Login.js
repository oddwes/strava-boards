import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { login, isLoggedIn } from "../utils/PizzlyUtil"
import Footer from "./Footer"

import '../styling/strava.css';

import strava_logo from "../assets/images/strava-logo.svg"

const pizzlyLink = "https://github.com/Bearer/Pizzly"
const footerText = "Oauth provided by Pizzly"

const Login = () => {
  return (
    <div className="vertical-center">
      <h3>Login and give me all your data</h3>
      <button className="strava-button" onClick={login}>
        <img src={strava_logo} width="50" height="50"/>
        <span style={{fontWeight: "bold"}}>Login</span>
      </button>
      <Footer text={footerText} url={pizzlyLink}/>
      { isLoggedIn() ? <Redirect to="/" /> : null}
    </div>
  )
}

export default Login