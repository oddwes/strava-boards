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

  const goalData = {
    labels: monthNames,
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: '# of People',
        data: [1, 9, 13, 32, 2, 3],
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