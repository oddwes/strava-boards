import React from 'react';
import Pizzly from 'pizzly-js'

const PIZZLY_HOSTNAME = process.env.REACT_APP_PIZZLY_HOST;
const PIZZLY_SETUP_ID = process.env.REACT_APP_PIZZLY_SETUP_ID;

const pizzly = new Pizzly({
  host: PIZZLY_HOSTNAME,
});

const strava = pizzly.integration("strava", {
  setupId: PIZZLY_SETUP_ID
});

const App = () => {
  const connect = () => {
    strava
      .connect()
      .then(({ authId }) => {
        console.log("Sucessfully connected!", authId);
        strava
          .auth(authId)
          .get('/athlete')
          .then((response) => console.log(response.json()))
      })
      .catch(console.error);
  };

  return (
    <div className="App">
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
      <button onClick={connect}>Retrieve your Strava profile</button>
    </div>
  );
}

export default App;
