import axios from "axios";

const CACHE_PROXY_HOST = process.env.REACT_APP_CACHE_PROXY_HOST;

export const getUser = ({ pizzly_auth_id }) => {
  return axios.get(`${CACHE_PROXY_HOST}/athlete`, { headers: { "Pizzly-Auth-Id": pizzly_auth_id } })
}

export const getActivities = ({ pizzly_auth_id, after }) => {
  return axios.get(`${CACHE_PROXY_HOST}/athlete/activities`, { params: { after: after }, headers: { "Pizzly-Auth-Id": pizzly_auth_id } })
}