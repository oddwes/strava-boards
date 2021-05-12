import React, { useState, useEffect } from "react"
import { getPowerRecords, getActivities } from "../../utils/StravaUtil"
import Select from "react-select"
import { Container, Col, Row } from "react-bootstrap";
import PowerRecords from "./PowerRecords"
import Loading from "./Loading"
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
  const [selectedYear, setSelectedYear] = useState(years[0])
  const [loading, setLoading] = useState(true)
  const [tooltips, setTooltips] = useState(null)

  useEffect(() => {
    const after = selectedYear.value.split("~")[0]
    const before = selectedYear.value.split("~")[1]
    setLoading(true)
    getActivities({ after: after, before: before })
      .then(response => {
        const sortedActivities = response.data.sort(function (a, b) { return new Date(b.created_at) - new Date(a.created_at) })
        setActivities(sortedActivities)
        getPowerRecords({ year: selectedYear.label })
          .then(response => {
            let sortedPowerRecords = response.data.sort(function (a, b) { return new Date(a.duration) - new Date(b.duration) })
            sortedPowerRecords = sortedPowerRecords.map(powerRecord => powerRecord.data)
            setPowerRecords(sortedPowerRecords)

            const associatedActivities = sortedPowerRecords.map((powerRecord) => {
              return sortedActivities.find((activity) => { return activity.id === powerRecord.activity_id });
            })
            setTooltips({
              callbacks: {
                title: function(tooltipItem, data) {
                  return `${associatedActivities[tooltipItem[0].index]?.title} (${associatedActivities[tooltipItem[0].index]?.created_at.split(' ')[0]})`
                }
              }
            })
            setLoading(false)
          })
      })
  }, [selectedYear])

  return (
    <React.Fragment>
      <Container className="pb-2">
        <Row className="justify-content-md-center">
          <Col xs lg="2">
            <Select options={years} value={selectedYear} onChange={(selected) => { setSelectedYear(selected) }} />
          </Col>
        </Row>
      </Container>
      {
        loading ? (
          <Loading />
        ) : (
          <React.Fragment>
            <Goals activities={activities} />
            <PowerRecords powerStatistics={powerRecords} tooltips={tooltips} />
          </React.Fragment>
        )
      }
    </React.Fragment>
  );
}

export default Statistics