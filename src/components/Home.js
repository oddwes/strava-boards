import React, { useEffect, useState } from "react"
import { getAuthId } from "../utils/PizzlyUtil"
import { getUser, getActivities } from "../utils/StravaUtil"
import { beginningOfMonth } from "../utils/DateUtil"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
  const [username, setUsername] = useState("_")
  const [activities, setActivities] = useState([])
  const [startDate, setStartDate] = useState(beginningOfMonth())
  const [endDate, setEndDate] = useState(new Date())

  useEffect(() => {
    getUser({pizzly_auth_id: getAuthId()}).then(response => setUsername(response.data.athlete.first_name))
  })

  useEffect(() => {
    getActivities({ pizzly_auth_id: getAuthId(), after: startDate, before: endDate })
    .then(response => {
      if (response.status === 200) {
        const sortedActivities = response.data.activities.sort(function(a,b) {return new Date(b.created_at) - new Date(a.created_at)})
        setActivities(sortedActivities)
        console.log(sortedActivities)
      }
    })
  }, [startDate, endDate])

  const activityInfo = activities.map((activity, index) => (
    <tr key={index}>
      <td>{activity.data.name}</td>
      <td>{activity.created_at}</td>
      <td>{Math.round(activity.data.moving_time / 60)} min</td>
      <td>{Math.round(activity.data.elapsed_time / 60)} min</td>
      <td>{(activity.data.distance / 1000).toFixed(2)} km</td>
      <td>{(activity.data.total_elevation_gain)} m</td>
    </tr>
  ))

  const totalDistance = (activities.map((activity) => activity.data.distance).reduce((a,b) => a + b, 0)/1000).toFixed(2)
  const totalElevation = activities.map((activity) => activity.data.total_elevation_gain).reduce((a,b) => a + b, 0)

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
            <th>Date</th>
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
            <th></th>
            <th>Totals:</th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th>Distance</th>
            <td>{totalDistance} km</td>
          </tr>
          <tr>
            <th></th>
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