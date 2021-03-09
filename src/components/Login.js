import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { login, isLoggedIn } from "../utils/PizzlyUtil"

const Login = () => {
  return (
    <React.Fragment>
      <h1>Hello!</h1>
      <p>
        Click the button bellow to retrieve your Strava profile using{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Bearer/Pizzly"
        >
          Pizzly
        </a>
        .
      </p>
      <button onClick={login}>Retrieve your Strava profile</button>
      { isLoggedIn() ? <Redirect to="/" /> : null}
    </React.Fragment>
  )
}

export default Login