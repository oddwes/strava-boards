import React, { useEffect, useState } from "react"
import { getAuthId } from "../utils/PizzlyUtil"
import { getUser } from "../utils/StravaUtil"
import { beginningOfMonth, today } from "../utils/DateUtil"
import DatePicker from "react-datepicker"
import { Activities } from "./Activities"
import { Container, Col, Row } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
  const [username, setUsername] = useState("_")
  const [startDate, setStartDate] = useState(beginningOfMonth())
  const [endDate, setEndDate] = useState(new Date())

  useEffect(() => {
    getUser({ pizzly_auth_id: getAuthId() }).then(response => setUsername(response.data.athlete.first_name))
  })

  const updateStartDate = ({ startDate }) => {
    setStartDate(startDate)
  }

  return (
    <Container fluid>
      <h3>Welcome {username}!</h3>
      <Row className="justify-content-md-center p-4">
        <Col lg="2">
          Start: <DatePicker selected={startDate} maxDate={endDate} onChange={date => updateStartDate({ startDate: date })} />
        </Col>
        <Col lg="2">
          End: <DatePicker selected={endDate} minDate={startDate} maxDate={today()} onChange={date => setEndDate(date)} />
        </Col>
      </Row>
      <div>
        <Activities startDate={startDate} endDate={endDate} />
      </div>
    </Container>
  )
}

export default Home