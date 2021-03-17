import React from 'react'

export const Activities = ({activities}) => {
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

  const totalDistance = (activities.map((activity) => activity.data.distance).reduce((a, b) => a + b, 0) / 1000).toFixed(2)
  const totalElevation = activities.map((activity) => activity.data.total_elevation_gain).reduce((a, b) => a + b, 0)

  return (
    <React.Fragment>
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
