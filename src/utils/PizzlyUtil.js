import Pizzly from 'pizzly-js'

const PIZZLY_HOSTNAME = process.env.REACT_APP_PIZZLY_HOST;
const PIZZLY_SETUP_ID = process.env.REACT_APP_PIZZLY_SETUP_ID;
const PIZZLY_SLUG = "strava";
const AUTH_ID_KEY = "stravaAuthId";

const pizzly = new Pizzly({
  host: PIZZLY_HOSTNAME,
});

const strava = pizzly.integration(PIZZLY_SLUG, {
  setupId: PIZZLY_SETUP_ID
});

export const login = () => {
  strava
    .connect()
    .then(({ authId }) => {
      localStorage.setItem(AUTH_ID_KEY, authId)
      window.location.href = "/"
    })
    .catch(console.error);
};

export const isLoggedIn = () => {
  return localStorage.getItem(AUTH_ID_KEY)
};

export const getUser = () => {
  const authId = localStorage.getItem(AUTH_ID_KEY)
  return strava
    .auth(authId)
    .get('/athlete')
}

export const getActivities = ({after}) => {
  const authId = localStorage.getItem(AUTH_ID_KEY)
  return strava
    .auth(authId)
    .get(`/athlete/activities?after=${after}`)
}