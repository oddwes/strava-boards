import React, { useEffect } from "react"
import { Redirect } from "react-router-dom"
import { login, isLoggedIn } from "../utils/PizzlyUtil"
import Footer from "./Footer"

import '../styling/strava.css';

import strava_logo from "../assets/images/strava-logo.svg"

const pizzlyLink = "https://github.com/Bearer/Pizzly"
const footerText = "Oauth provided by Pizzly"

const Login = () => {
  const redirected = new URLSearchParams(window.location.search).get('redirected')

  return (
    <div className="vertical-center">
      <button className="strava-button" onClick={login}>
        <img src={strava_logo} width="50" height="50" alt="strava logo"/>
        <span style={{fontWeight: "bold"}}>Login</span>
      </button>
      <Footer text={footerText} url={pizzlyLink}/>
      { isLoggedIn() && !redirected ? <Redirect to="/" /> : null}
    </div>
  )
}

export default Login