import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Button, ButtonGroup, ButtonToolbar, Container, Row } from "react-bootstrap"
import { getActivityPowerRecords, getActivity, refreshActivity } from "../../utils/StravaUtil"
import PowerRecords from "../statistics/PowerRecords"

const Activity = (props) => {
  const activityId = useParams().id
  const [activity, setActivity] = useState(null)
  const [powerStatistics, setPowerStatistics] = useState([])

  useEffect(() => {
    getActivity({ activityId: activityId })
      .then(response => {
        setActivity(response.data)
      })
    getActivityPowerRecords({ activityId: activityId })
      .then(response => {
        if (response.status === 200) {
          setPowerStatistics(response.data)
        }
      })
  }, [])

  return (
    <Container>
      <h1 style={{color: "#666666"}}>{activity?.title}</h1>
      <h4 style={{color: "#666666"}}>{activity?.data?.description}</h4>
      <hr />
      <Row>
        <ButtonToolbar className="pb-4">
          <ButtonGroup className="mr-2">
            <a href={"/activities"}>
              <Button variant="light">Back</Button>
            </a>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="success" onClick={() => { refreshActivity({ activityStravaId: activityId }) }}>Refresh</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Row>
      <Row>
        <PowerRecords powerStatistics={powerStatistics} tooltips={{ enabled: false }}/>
      </Row>
    </Container>
  )
}

export default Activity