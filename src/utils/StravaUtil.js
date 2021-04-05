import axios from "axios";
import { getAuthId, getAthleteId } from "./PizzlyUtil"

const CACHE_HOST = process.env.REACT_APP_CACHE_HOST;

const headers = () => {
  return { "Pizzly-Auth-Id": getAuthId(), "Athlete-Id": getAthleteId() }
}

export const getUser = () => {
  return axios.get(`${CACHE_HOST}/athlete`, { headers: headers() })
}

export const getActivities = ({ after, before, filters }) => {
  return axios.get(`${CACHE_HOST}/athlete/activities`, { params: { after: after, before: before, filters: filters}, headers: headers() })
}

export const getPowerRecords = ({ athleteId, year }) => {
  return axios.get(`${CACHE_HOST}/athlete/power_records`, { params: { year: year }, headers: headers() })
}