import React from "react"
import { Line } from "react-chartjs-2"
import { Container, Row } from "react-bootstrap";
import moment from "moment";
import { MetersLoading } from "./Loading";

const Goals = ({activities, loading}) => {

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

  const monthIndices = Array.from({length: 12}, (x, i) => i + 1);
  const actualTotal = ({ calculator }) => monthIndices.map(calculator)
  const expectedTotal = ({ goal }) => monthIndices.map((monthIndex) => { return goal / 12 * monthIndex })

  const goalData = ({ goal, dataCalculator }) => (
    {
      labels: moment.months(),
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
    title: { display: true, position: "bottom", text: title, fontSize: 24 },
    legend: { display: false },
    plugins: {
      datalabels: {
         display: false,
      }
   }
  })

  return (
    <Container>
      {
        loading ? (
          <React.Fragment>
            <Row className="pt-4">
              <MetersLoading />
            </Row>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Row className="pb-2">
              <Line data={goalData({ goal: 100000, dataCalculator: monthlyMetersCalculator })} options={options({ title: "Elevation" })} />
            </Row>
            <Row>
              <Line data={goalData({ goal: 10000, dataCalculator: monthlyDistanceCalculator })} options={options({ title: "Distance" })} />
            </Row>
          </React.Fragment>
        )
      }
    </Container>
  )
}

export default Goals