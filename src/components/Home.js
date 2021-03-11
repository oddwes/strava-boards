import React, { useEffect, useState } from "react"
import { getUser, getActivities } from "../utils/PizzlyUtil"
import { beginningOfMonth } from "../utils/DateUtil"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
  const [username, setUsername] = useState("_")
  const [activities, setActivities] = useState([])
  const [startDate, setStartDate] = useState(beginningOfMonth())
  const [endDate, setEndDate] = useState(new Date())

  useEffect(() => {
    getUser().then(response => response.json().then(object => setUsername(object.firstname)))
  })

  useEffect(() => {
    getActivities({ after: startDate.getTime() / 1000, before: endDate.getTime() / 1000 }).then(response => { if (response.status === 200) { response.json().then(object => setActivities(object)) } })
  }, [startDate, endDate])

  const activityInfo = activities.map((activity, index) => (
    <tr key={index}>
      <td>{activity.name}</td>
      <td>{Math.round(activity.moving_time / 60)} min</td>
      <td>{Math.round(activity.elapsed_time / 60)} min</td>
      <td>{(activity.distance / 1000).toFixed(2)} km</td>
      <td>{(activity.total_elevation_gain)} m</td>
    </tr>
  ))

  const totalDistance = (activities.map((activity) => activity.distance).reduce((a,b) => a + b, 0)/1000).toFixed(2)
  const totalElevation = activities.map((activity) => activity.total_elevation_gain).reduce((a,b) => a + b, 0)

  const updateStartDate = ({ startDate }) => {
    setStartDate(startDate)
  }

  return (
    <React.Fragment>
      <h1>THE BEST STRAVA DASHBOARD EVER</h1>
      <br />
      <hr />
      <h3>Welcome {username}!</h3>
      <div>
        <span>You've done {activities.length} activities in this date range:</span>
      </div>
      <DatePicker selected={startDate} maxDate={endDate} onChange={date => updateStartDate({ startDate: date })} />
      <DatePicker selected={endDate} minDate={startDate} onChange={date => setEndDate(date)} />
      <table>
        <thead>
          <tr>
            <th>Ride Name</th>
            <th>Moving Time</th>
            <th>Elapsed Time</th>
            <th>Distance</th>
            <th>Elevation</th>
          </tr>
        </thead>
        <tbody>
          {activityInfo}
        </tbody>
        <tfoot>
          <tr></tr>
          <tr>
            <th></th>
            <th>Totals:</th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th>Distance</th>
            <td>{totalDistance} km</td>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th>Elevation</th>
            <td>{totalElevation} m</td>
          </tr>
        </tfoot>
      </table>
    </React.Fragment>
  )
}

export default Home