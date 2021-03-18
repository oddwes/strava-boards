import React, { useEffect, useState } from "react"
import { getAuthId } from "../utils/PizzlyUtil"
import { getUser, getActivities } from "../utils/StravaUtil"
import { monthNames, monthIndices, beginningOfMonth } from "../utils/DateUtil"
import DatePicker from "react-datepicker"
import { Activities } from "./Activities"
import { Doughnut, Line } from 'react-chartjs-2';

import "react-datepicker/dist/react-datepicker.css";


const Home = () => {
  const [username, setUsername] = useState("_")
  const [activities, setActivities] = useState([])
  const [startDate, setStartDate] = useState(beginningOfMonth())
  const [endDate, setEndDate] = useState(new Date())

  useEffect(() => {
    getUser({ pizzly_auth_id: getAuthId() }).then(response => setUsername(response.data.athlete.first_name))
  })

  useEffect(() => {
    getActivities({ pizzly_auth_id: getAuthId(), after: startDate, before: endDate })
      .then(response => {
        if (response.status === 200) {
          const sortedActivities = response.data.activities.sort(function (a, b) { return new Date(b.created_at) - new Date(a.created_at) })
          setActivities(sortedActivities)
        }
      })
  }, [startDate, endDate])

  const updateStartDate = ({ startDate }) => {
    setStartDate(startDate)
  }

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

  const monthlyMetersCalculator = (monthIndex) => {
    let activitiesForTheMonth = activities.filter((activity) => activity.data.start_date.split("-")[1] === String(monthIndex).padStart(2, "0"))
    let monthlyMeters = activitiesForTheMonth.reduce((result, activity) => result + activity.data.total_elevation_gain, 0 )
    if (monthlyMeters === 0 && monthIndex !== 0) {
      return monthlyMetersCalculator(monthIndex - 1)
    } else {
      return monthlyMeters
    }
  }
  const actualMonthlyMeters = monthIndices.map(monthlyMetersCalculator)

  const expectMonthlyMeters = monthIndices.map((monthIndex) => {
    return 10000/12 * monthIndex
  })

  const goalData = {
    labels: monthNames,
    datasets: [
      {
        label: 'Actual',
        data: actualMonthlyMeters,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Required',
        data: expectMonthlyMeters,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  }

  return (
    <React.Fragment>
      <div className="strava-header py-4">
        <h1>THE BEST STRAVA DASHBOARD EVER</h1>
      </div>
      <br />
      <h3>Welcome {username}!</h3>
      <div>
        <span>You've done {activities.length} activities in this date range:</span>
      </div>
      <DatePicker selected={startDate} maxDate={endDate} onChange={date => updateStartDate({ startDate: date })} />
      <DatePicker selected={endDate} minDate={startDate} onChange={date => setEndDate(date)} />
      <Activities activities={activities} />
      <Doughnut data={data} />
      <Line data={goalData} />
    </React.Fragment>
  )
}

export default Home