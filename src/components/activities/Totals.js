import React from "react"
import { Table } from 'react-bootstrap'

const Totals = ({ activityData }) => {
  const totalDistance = (activityData.map((activity) => activity.data.distance).reduce((a, b) => a + b, 0) / 1000).toFixed(2)
  const totalElevation = activityData.map((activity) => activity.data.total_elevation_gain).reduce((a, b) => a + b, 0)

  return (
    <React.Fragment>
      <div style={{ width: "50%", float: "right" }}>
        <Table hover>
          <thead>
            <tr>
              <th>Totals:</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <th>Rides</th>
              <th>{activityData.length}</th>
            </tr>
            <tr>
              <td></td>
              <th>Distance</th>
              <td>{totalDistance} km</td>
            </tr>
            <tr>
              <td></td>
              <th>Elevation</th>
              <td>{totalElevation} m</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  )
}

export default Totals