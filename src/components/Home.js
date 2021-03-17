import React, { useEffect, useState } from "react"
import { getAuthId } from "../utils/PizzlyUtil"
import { getUser, getActivities } from "../utils/StravaUtil"
import { beginningOfMonth } from "../utils/DateUtil"
import DatePicker from "react-datepicker"
import { Activities } from "./Activities"
import { RadialChart, Hint } from "react-vis"

import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
  const [username, setUsername] = useState("_")
  const [activities, setActivities] = useState([])
  const [startDate, setStartDate] = useState(beginningOfMonth())
  const [endDate, setEndDate] = useState(new Date())
  const [value, setValue] = useState(false)

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
      <div>
        <RadialChart
          innerRadius={80}
          radius={140}
          data={
            [
              {
                // label: 'Indoor Rides',
                // subLabl: activities.filter((activity) => activity.data.trainer === true).length / activities.length,
                activityCount: activities.filter((activity) => activity.data.trainer === true).length,
                color: "#E7F8F3",
                angle: activities.filter((activity) => activity.data.trainer === true).length / activities.length,
              },
              {
                angle: activities.filter((activity) => activity.data.trainer === false).length / activities.length,
                activityCount: activities.filter((activity) => activity.data.trainer === false).length,
                // label: "Outdoor Rides",
                color: "#14939A",
              },
            ]
          }
          width={300}
          height={300}
          showLabels={true}
          colorType="literal"
          onValueMouseOver={v => setValue({ activities: v.activityCount })}
          onSeriesMouseOut={() => setValue(false)}
          padAngle={0.04}
        >
          {value !== false && <Hint value={value} className="rv-hint" />}
        </RadialChart>

      </div>
    </React.Fragment>
  )
}

export default Home