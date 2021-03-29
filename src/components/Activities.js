import React, { useState, useEffect } from 'react'
import { getAuthId } from "../utils/PizzlyUtil"
import { getActivities } from "../utils/StravaUtil"
import { Table } from 'react-bootstrap'
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";

export const Activities = ({ startDate, endDate }) => {
  const [activities, setActivities] = useState([])
  const [selectedRideType, setSelectedRideType] = useState({})
  const [selectedVisibility, setselectedVisibility] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getActivities({ pizzly_auth_id: getAuthId(), after: startDate, before: endDate, filters: Object.assign({}, selectedRideType, selectedVisibility) })
      .then(response => {
        if (response.status === 200) {
          const sortedActivities = response.data.sort(function (a, b) { return new Date(b.created_at) - new Date(a.created_at) })
          setActivities(sortedActivities)
          setLoading(false)
        }
      })
  }, [startDate, endDate, selectedRideType, selectedVisibility])

  const activityInfo = activities.map((activity, index) => (
    <tr key={index} style={{ backgroundColor: (activity.data.trainer === false) ? "#F2F2F2" : null }}  >
      <td>{activity.data.name}</td>
      <td>{activity.created_at}</td>
      <td>{Math.round(activity.data.moving_time / 60)} min</td>
      <td>{Math.round(activity.data.elapsed_time / 60)} min</td>
      <td>{(activity.data.distance / 1000).toFixed(2)} km</td>
      <td>{activity.data.total_elevation_gain} m</td>
      <td>{(activity.data.trainer === true) ? "Indoor" : "Outdoor"}</td>
      <td>{(activity.data.visibility === "only_me") ? "Private" : "Public"}</td>
    </tr>
  ))

  const totalDistance = (activities.map((activity) => activity.data.distance).reduce((a, b) => a + b, 0) / 1000).toFixed(2)
  const totalElevation = activities.map((activity) => activity.data.total_elevation_gain).reduce((a, b) => a + b, 0)

  const data = {
    labels: ['Indoor Rides', 'Outdoor Rides'],
    datasets: [
      {
        label: '# of Rides',
        data: [
          activities.filter((activity) => activity.data.trainer === true).length,
          activities.filter((activity) => activity.data.trainer === false).length,
        ],
        backgroundColor: [
          "#E7F8F3",
          "#14939A",
        ],
        borderColor: [
          "#14939A", 'grey'
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    title: {
      display: true,
      text: "Indoor/Outdoor Breakdown",
      fontSize: 24
    },
    legend: {
      display: false
    }
  }

  const rideTypeChanged = selected => {
    if (selected.target.innerText === "Indoor") {
      setSelectedRideType({ trainer: "true" })
    } else if (selected.target.innerText === "Outdoor") {
      setSelectedRideType({ trainer: "false" })
    }
  }

  const visibilityChanged = selected => {
    if (selected.target.innerText === "Public") {
      setselectedVisibility({ visibility: "everyone" })
    } else if (selected.target.innerText === "Private") {
      setselectedVisibility({ visibility: "only_me" })
    }
  }

  const override = css`
    display: block;
    margin: auto;
    border-color: red;
    display: inline-block
  `;

  return (
    <React.Fragment>
      {
        loading ? (
          <PropagateLoader color="#000000" loading={true} css={override} />
        ) : (
          <React.Fragment>
            <Table>
              <thead>
                <tr>
                  <th>Ride Name</th>
                  <th>Date</th>
                  <th>Moving Time</th>
                  <th>Elapsed Time</th>
                  <th>Distance</th>
                  <th>Elevation</th>
                  <th> <a href="#" onClick={rideTypeChanged}>Indoor</a> / <a href="#" onClick={rideTypeChanged}>Outdoor</a> </th>
                  <th> <a href="#" onClick={visibilityChanged}>Public</a> / <a href="#" onClick={visibilityChanged}>Private</a> </th>
                </tr>
              </thead>
              <tbody>
                {activityInfo}
              </tbody>
            </Table>
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
                    <th>Activities</th>
                    <th>{activities.length}</th>
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
    </React.Fragment>
  )
}
