import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Table } from 'react-bootstrap';

export const Activities = ({activities}) => {
  const activityInfo = activities.map((activity, index) => (
    <tr key={index}>
      <td>{activity.data.name}</td>
      <td>{activity.created_at}</td>
      <td>{Math.round(activity.data.moving_time / 60)} min</td>
      <td>{Math.round(activity.data.elapsed_time / 60)} min</td>
      <td>{(activity.data.distance / 1000).toFixed(2)} km</td>
      <td>{activity.data.total_elevation_gain} m</td>
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

  return (
    <React.Fragment>
      <Table striped bordered hover>
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
          <br/>
          <tr>
            <th>Totals:</th>
            <th>Activities</th>
            <td>{activities.length}</td>
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
        <tfoot>
        </tfoot>
      </Table>
      <br/>
      <div style={{width: "50%"}}>
        <Doughnut data={data} options={options}/>
      </div>
    </React.Fragment>
  )
}
