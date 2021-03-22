import React, { useEffect, useState } from "react"
import { getAuthId } from "../utils/PizzlyUtil"
import { getUser, getActivities } from "../utils/StravaUtil"
import { beginningOfMonth, today } from "../utils/DateUtil"
import DatePicker from "react-datepicker"
import { Activities } from "./Activities"
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/react";
import { Container, Col, Row } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";


const Home = () => {
  const [username, setUsername] = useState("_")
  const [activities, setActivities] = useState([])
  const [startDate, setStartDate] = useState(beginningOfMonth())
  const [endDate, setEndDate] = useState(new Date())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUser({ pizzly_auth_id: getAuthId() }).then(response => setUsername(response.data.athlete.first_name))
  })

  useEffect(() => {
    setLoading(true)
    getActivities({ pizzly_auth_id: getAuthId(), after: startDate, before: endDate })
      .then(response => {
        if (response.status === 200) {
          const sortedActivities = response.data.activities.sort(function (a, b) { return new Date(b.created_at) - new Date(a.created_at) })
          setActivities(sortedActivities)
          setLoading(false)
        }
      })
  }, [startDate, endDate])

  const updateStartDate = ({ startDate }) => {
    setStartDate(startDate)
  }

  const override = css`
    display: block;
    margin: auto;
    border-color: red;
    display: inline-block
  `;

  return (
    <Container fluid>
      {
        loading ? (null) : (<h3>Welcome {username}!</h3>)
      }
      <Row className="justify-content-md-center p-4">
        <Col lg="2">
          Start: <DatePicker selected={startDate} maxDate={endDate} onChange={date => updateStartDate({ startDate: date })} />
        </Col>
        <Col lg="2">
          End: <DatePicker selected={endDate} minDate={startDate} maxDate={today()} onChange={date => setEndDate(date)} />
        </Col>
      </Row>
      <div>
        {
          loading ? (
            <PropagateLoader color="#000000" loading={true} css={override} />
          ) : (
            <Activities activities={activities} />
          )
        }
      </div>
    </Container>
  )
}

export default Home