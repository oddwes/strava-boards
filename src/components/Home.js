import React, { useEffect, useState } from "react"
import { getAuthId } from "../utils/PizzlyUtil"
import { getUser, getActivities } from "../utils/StravaUtil"
import { beginningOfMonth, today } from "../utils/DateUtil"
import DatePicker from "react-datepicker"
import { Activities } from "./Activities"

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

  return (
    <React.Fragment>
      <h3>Welcome {username}!</h3>
      <div>
        Start: <DatePicker selected={startDate} maxDate={endDate} onChange={date => updateStartDate({ startDate: date })} />
      </div>
      <div>
        End: <DatePicker selected={endDate} minDate={startDate} maxDate={today()} onChange={date => setEndDate(date)} />
      </div>
      <br/>
      <div>
        <Activities activities={activities} />
      </div>
    </React.Fragment>
  )
}

export default Home