import Pizzly from 'pizzly-js'
import { getAthlete } from "./StravaUtil"

const PIZZLY_HOSTNAME = process.env.REACT_APP_PIZZLY_HOST;
const PIZZLY_SETUP_ID = process.env.REACT_APP_PIZZLY_SETUP_ID;
const PIZZLY_SLUG = "strava";
const AUTH_ID_KEY = "stravaAuthId";
const ATHLETE_ID_KEY = "athleteId";

const pizzly = new Pizzly({
  host: PIZZLY_HOSTNAME,
});

const strava = pizzly.integration(PIZZLY_SLUG, {
  setupId: PIZZLY_SETUP_ID
});

export const login = async () => {
  await strava.connect().then(({ authId }) => { localStorage.setItem(AUTH_ID_KEY, authId) })
  await strava
    .auth(getAuthId())
    .get('/athlete')
    .then((response) => response.json())
    .then(json => { localStorage.setItem(ATHLETE_ID_KEY, json.id) })
  await getAthlete()

  window.location.href = "/"
};

export const isLoggedIn = async () => {
  return getAuthId && getAthleteId()
}

export const getAuthId = () => {
  return localStorage.getItem(AUTH_ID_KEY)
}

export const getAthleteId = () => {
  return localStorage.getItem(ATHLETE_ID_KEY)
}