import React, { useState, useEffect } from "react"
import { getPowerRecords, getActivities } from "../../utils/StravaUtil"
import Select from "react-select"
import { Container, Col, Row } from "react-bootstrap";
import PowerRecords from "./PowerRecords"
import Goals from "./Goals"

import 'chartjs-plugin-datalabels';

const Statistics = () => {
  const years = [
    { value: "2021-01-01~2021-12-31", label: "2021" },
    { value: "2020-01-01~2020-12-31", label: "2020" },
    { value: "2019-01-01~2019-12-31", label: "2019" },
  ];

  const [activities, setActivities] = useState([])
  const [powerRecords, setPowerRecords] = useState([])
  const [goalsYear, setGoalsYear] = useState(years[0])
  const [goalsLoading, setGoalsLoading] = useState(true)
  const [powerYear, setPowerYear] = useState(years[0])
  const [powerLoading, setPowerLoading] = useState(true)

  const [tooltips, setTooltips] = useState(null)

  useEffect(() => {
    const after = goalsYear.value.split("~")[0]
    const before = goalsYear.value.split("~")[1]
    setGoalsLoading(true)
    getActivities({ after: after, before: before })
      .then(response => {
        const sortedActivities = response.data.sort(function (a, b) { return new Date(b.created_at) - new Date(a.created_at) })
        setActivities(sortedActivities)
        setGoalsLoading(false)
      })
  }, [goalsYear])

  useEffect(() => {
    setPowerLoading(true)
    getPowerRecords({ year: powerYear.value?.split("-")[0] })
      .then(response => {
        let sortedPowerRecords = response.data.sort(function (a, b) { return new Date(a.duration) - new Date(b.duration) })
        setPowerRecords(sortedPowerRecords)

        setTooltips({
          callbacks: {
            title: function(tooltipItem, data) {
              return `${sortedPowerRecords[tooltipItem[0].index].activity_title} (${sortedPowerRecords[tooltipItem[0].index]?.activity_date.split(' ')[0]})`
            }
          }
        })
        setPowerLoading(false)
      })
  }, [powerYear])

  return (
    <Container fluid>
      <Row>
        <Col>
          <Row className="justify-content-md-center">
            <Col xs lg="2">
              <Select options={years} value={goalsYear} onChange={(selected) => { setGoalsYear(selected) }} />
            </Col>
          </Row>
          <Goals activities={activities} loading={goalsLoading} />
        </Col>
        <Col>
          <Row className="justify-content-md-center">
            <Col xs lg="2">
              <Select options={years.concat({value: "", label: "All Time"})} value={powerYear} onChange={(selected) => { setPowerYear(selected) }} />
            </Col>
          </Row>
          <PowerRecords powerStatistics={powerRecords} tooltips={tooltips} loading={powerLoading}/>
        </Col>
      </Row>
    </Container>
  );
}

export default Statistics