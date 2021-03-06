import { getAuthId, getAthleteId } from "./PizzlyUtil"
import axios from "axios";
import axiosRetry from 'axios-retry';

const CACHE_HOST = process.env.REACT_APP_CACHE_HOST;

const headers = () => {
  return { "Pizzly-Auth-Id": getAuthId(), "Athlete-Id": getAthleteId() }
}

export const getAthlete = async () => {
  try {
    const response = await axios.get(`${CACHE_HOST}/athlete`, { headers: headers() });
    return response;
  } catch (message) {
    return console.error(message);
  }
}

export const syncActivitiesForYear = ({ year }) => {
  return axios.post(`${CACHE_HOST}/athlete/sync_activities`, { year: year }, { headers: headers() })
}

export const getActivities = ({ after, before, filters }) => {
  return axios.get(`${CACHE_HOST}/athlete/activities`, { params: { after: after, before: before, filters: filters }, headers: headers() })
}

export const getActivity = ({ activityId }) => {
  return axios.get(`${CACHE_HOST}/activities/${activityId}`, { headers: headers() })
}

export const refreshActivity = ({ activityStravaId }) => {
  return axios.put(`${CACHE_HOST}/activities/${activityStravaId}`, {}, { headers: headers() })
}

export const getPowerRecords = ({ year }) => {
  return axios.get(`${CACHE_HOST}/athlete/power_records`, { params: { year: year }, headers: headers() })
}

export const getActivityPowerRecords = ({ activityId }) => {
  return axios.get(`${CACHE_HOST}/power_records/${activityId}`, { params: {}, headers: headers() })
}

axiosRetry(axios, {
  retries: Infinity,
  retryDelay: (retryCount) => { return 1000 },
  retryCondition: (error) => {
    return error.response.status === 307
  },
});

axios.interceptors.response.use(
  response => { return response },
  error => {
    if (error.response.status === 401) {
      window.location.href = "/login?redirected=true"
    }
  }
)