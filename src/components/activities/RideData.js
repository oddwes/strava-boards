import React from "react"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"

const RideData = ({ activityData }) => {
  const activityInfo = activityData.map((activity, index) => (
    <tr key={index} style={{ backgroundColor: (activity.data.visibility === "only_me") ? "#F2F2F2" : null }}  >
      <td>
        <Link to={{ pathname: "/activity", state: {activity: activity} }}>
          {activity.data.name}
        </Link>
      </td>
      <td>{activity.created_at}</td>
      <td>{Math.round(activity.data.moving_time / 60)} min</td>
      <td>{Math.round(activity.data.elapsed_time / 60)} min</td>
      <td>{(activity.data.distance / 1000).toFixed(2)} km</td>
      <td>{activity.data.total_elevation_gain} m</td>
      <td>{(activity.data.trainer === true) ? "Indoor" : "Outdoor"}</td>
      <td>{(activity.data.visibility === "only_me") ? "Private" : "Public"}</td>
      <td>
        <a href={`https://strava.com/activities/${activity.strava_id}`} target="_blank" rel="noreferrer">
          <Button className="p-2" style={{ borderColor: "#FC5200", backgroundColor: "#FC5200", color: "white" }}>Strava Activity</Button>
        </a>
      </td>
    </tr>
  ))

  return (
    <React.Fragment>
      {activityInfo}
    </React.Fragment>
  )
}

export default RideData