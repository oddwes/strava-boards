import React from "react"
import { Line } from "react-chartjs-2"
import { Container, Col, Row } from "react-bootstrap";
import { monthNames, monthIndices } from "../../utils/DateUtil"

const Goals = ({activities}) => {

  const monthlyMetersCalculator = (monthIndex) => {
    let activitiesForTheMonth = activities.filter((activity) => activity.data.start_date.split("-")[1] <= String(monthIndex).padStart(2, "0"))
    let monthlyMeters = activitiesForTheMonth.reduce((result, activity) => result + activity.data.total_elevation_gain, 0)
    if (monthlyMeters === 0 && monthIndex !== 0) {
      return monthlyMetersCalculator(monthIndex - 1)
    } else {
      return monthlyMeters
    }
  }

  const monthlyDistanceCalculator = (monthIndex) => {
    let activitiesForTheMonth = activities.filter((activity) => activity.data.start_date.split("-")[1] <= String(monthIndex).padStart(2, "0"))
    let monthlyDistance = (activitiesForTheMonth.reduce((result, activity) => result + activity.data.distance, 0) / 1000).toFixed(2)
    if (monthlyDistance === 0 && monthIndex !== 0) {
      return monthlyDistanceCalculator(monthIndex - 1)
    } else {
      return monthlyDistance
    }
  }

  const actualTotal = ({ calculator }) => monthIndices.map(calculator)
  const expectedTotal = ({ goal }) => monthIndices.map((monthIndex) => { return goal / 12 * monthIndex })

  const goalData = ({ goal, dataCalculator }) => (
    {
      labels: monthNames,
      datasets: [
        {
          label: "Required",
          data: expectedTotal({ goal: goal }),
          fill: true
        },
        {
          label: "Actual",
          data: actualTotal({ calculator: dataCalculator }),
          backgroundColor: "#03CED2",
          borderColor: "#03CED2",
          fill: true,
          lineTension: 0
        },
      ]
    }
  )

  const options = ({ title }) => ({
    title: { display: true, text: title, fontSize: 24 },
    legend: { position: "bottom" },
    plugins: {
      datalabels: {
         display: false,
      }
   }
  })

  return (
    <Container fluid>
      <Row>
        <Col>
          <Line data={goalData({ goal: 100000, dataCalculator: monthlyMetersCalculator })} options={options({ title: "Elevation" })} />
        </Col>
        <Col>
          <Line data={goalData({ goal: 10000, dataCalculator: monthlyDistanceCalculator })} options={options({ title: "Distance" })} />
        </Col>
      </Row>
    </Container>
  )
}

export default Goals