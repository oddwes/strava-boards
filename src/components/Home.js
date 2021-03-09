import React, { useEffect, useState } from "react"
import { getUser, getActivities } from "../utils/PizzlyUtil"
import { beginningOfMonth } from "../utils/DateUtil"

const Home = () => {
  const [username, setUsername] = useState([])
  const [activityCount, setActivityCount] = useState([])

  useEffect(() => {
    getUser().then(response => response.json().then(object => setUsername(`${object.firstname} ${object.lastname}`)))
    getActivities({after: beginningOfMonth().getTime()/1000}).then(response => response.json().then(object => setActivityCount(object.length)))
  })

  return (
    <React.Fragment>
      <h1>THE BEST STRAVA DASHBOARD EVER</h1>
      <br />
      <hr />
      <h3>Welcome {username}!!!</h3>
      <h3>You've done {activityCount} activities this month</h3>
    </React.Fragment>
  )
}

export default Home