import axios from "axios";

const CACHE_HOST = process.env.REACT_APP_CACHE_HOST;

export const getUser = ({ pizzly_auth_id }) => {
  return axios.get(`${CACHE_HOST}/athlete`, { headers: { "Pizzly-Auth-Id": pizzly_auth_id } })
}

export const getActivities = ({ pizzly_auth_id, after, before }) => {
  return axios.get(`${CACHE_HOST}/athlete/activities`, { params: { after: after, before: before }, headers: { "Pizzly-Auth-Id": pizzly_auth_id } })
}