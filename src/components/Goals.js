import React, { useEffect, useState } from "react"
import { getAuthId } from "../utils/PizzlyUtil"
import { getActivities } from "../utils/StravaUtil"
import { monthNames, monthIndices } from "../utils/DateUtil"
import { Line } from "react-chartjs-2"
import Select from "react-select"
import BarLoader from "react-spinners/BarLoader";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { css } from "@emotion/react";

const Goals = () => {
  const [activities, setActivities] = useState([])
  const years = [
    { value: "2021-01-01~2022-01-01", label: "2021" },
    { value: "2020-01-01~2021-01-01", label: "2020" },
    { value: "2019-01-01~2020-01-01", label: "2019" },
  ];
  const [selectedYear, setSelectedYear] = useState(years[0])

  useEffect(() => {
    const after = selectedYear.value.split("~")[0]
    const before = selectedYear.value.split("~")[1]
    setLoading(true)
    getActivities({ pizzly_auth_id: getAuthId(), after: after, before: before })
      .then(response => {
        if (response.status === 200) {
          const sortedActivities = response.data.activities.sort(function (a, b) { return new Date(b.created_at) - new Date(a.created_at) })
          setActivities(sortedActivities)
          setLoading(false)
        }
      })
  }, [selectedYear])

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

  const options = ({ title }) => ({ title: { display: true, text: title, fontSize: 24 }, legend: { position: "bottom" } })

  const yearChanged = selected => { setSelectedYear(selected) }

  const [loading, setLoading] = useState(true)

  const override = css`
    display: block;
    margin: auto;
    border-color: red;
    display: inline-block
  `;

  return (
    <React.Fragment>
      <div style={{ width: "25%", position: "absolute", left: "50%", transform: "translate(-50%, -50%)" }}>
        <Select options={years} value={selectedYear} onChange={yearChanged} />
      </div>
      {
        loading ? (
          <React.Fragment>
            <div style={{ width: "50%", display: "inline-block" }}>
              <ClimbingBoxLoader color="#000000" loading={true} css={override} />
            </div>
            <div style={{ width: "50%", display: "inline-block" }}>
              <BarLoader color="#000000" loading={true} css={override} />
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div style={{ width: "50%", display: "inline-block" }}>
              <Line data={goalData({ goal: 100000, dataCalculator: monthlyMetersCalculator })} options={options({ title: "Elevation" })} />
            </div>
            <div style={{ width: "50%", display: "inline-block" }}>
              <Line data={goalData({ goal: 10000, dataCalculator: monthlyDistanceCalculator })} options={options({ title: "Distance" })} />
            </div>
          </React.Fragment>
        )
      }
    </React.Fragment>
  )
}

export default Goals