import React, { useState, useEffect } from 'react'
import { getAuthId } from "../../utils/PizzlyUtil"
import { getActivities } from "../../utils/StravaUtil"
import { beginningOfMonth, today } from "../../utils/DateUtil"
import { Container, Col, Row, Table } from 'react-bootstrap'
import { css } from "@emotion/react"
import DatePicker from "react-datepicker"
import PropagateLoader from "react-spinners/PropagateLoader"
import Totals from "./Totals"
import RideData from './RideData'

import "react-datepicker/dist/react-datepicker.css";

const Activities = () => {
  const [startDate, setStartDate] = useState(beginningOfMonth())
  const [endDate, setEndDate] = useState(new Date())
  const [activityData, setActivityData] = useState([])
  const [selectedRideType, setSelectedRideType] = useState({})
  const [selectedVisibility, setSelectedVisibility] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getActivities({ pizzly_auth_id: getAuthId(), after: startDate, before: endDate, filters: Object.assign({}, selectedRideType, selectedVisibility) })
      .then(response => {
        if (response.status === 200) {
          const sortedActivityData = response.data.sort(function (a, b) { return new Date(b.created_at) - new Date(a.created_at) })
          setActivityData(sortedActivityData)
          setLoading(false)
        }
      })
  }, [startDate, endDate, selectedRideType, selectedVisibility])

  const rideTypeChanged = selected => {
    if (selected.target.innerText === "Indoor") {
      setSelectedRideType({ trainer: "true" })
    } else if (selected.target.innerText === "Outdoor") {
      setSelectedRideType({ trainer: "false" })
    }
  }

  const rideTypeFilter = () => {
    if (selectedRideType?.trainer === "true") {
      return <React.Fragment><a href="/#" onClick={()=>{setSelectedRideType(null)}} style={{color:"black"}}>Indoor</a> / <a href="/#" onClick={rideTypeChanged}>Outdoor</a></React.Fragment>
    } else if (selectedRideType?.trainer === "false") {
      return <React.Fragment><a href="/#" onClick={rideTypeChanged}>Indoor</a> / <a href="/#" onClick={()=>{setSelectedRideType(null)}} style={{color:"black"}}>Outdoor</a></React.Fragment>
    } else {
      return <React.Fragment><a href="/#" onClick={rideTypeChanged}>Indoor</a> / <a href="/#" onClick={rideTypeChanged}>Outdoor</a></React.Fragment>
    }
  }

  const visibilityChanged = selected => {
    if (selected.target.innerText === "Public") {
      setSelectedVisibility({ visibility: "everyone" })
    } else if (selected.target.innerText === "Private") {
      setSelectedVisibility({ visibility: "only_me" })
    }
  }

  const visibilityFilter = () => {
    if (selectedVisibility?.visibility === "everyone") {
      return <React.Fragment><a href="/#" onClick={()=>{setSelectedVisibility(null)}} style={{color:"black"}}>Public</a> / <a href="/#" onClick={visibilityChanged}>Private</a></React.Fragment>
    } else if (selectedVisibility?.visibility === "only_me") {
      return <React.Fragment><a href="/#" onClick={visibilityChanged}>Public</a> / <a href="/#" onClick={()=>{setSelectedVisibility(null)}} style={{color:"black"}}>Private</a></React.Fragment>
    } else {
      return <React.Fragment><a href="/#" onClick={visibilityChanged}>Public</a> / <a href="/#" onClick={visibilityChanged}>Private</a></React.Fragment>
    }
  }

  const override = css`
    display: block;
    margin: auto;
    border-color: red;
    display: inline-block
  `;

  return (
    <React.Fragment>
      {
        loading ? (
          <PropagateLoader color="#000000" loading={true} css={override} />
        ) : (
          <Container fluid>
            <Row className="justify-content-md-center p-4">
              <Col lg="2">
                Start: <DatePicker selected={startDate} maxDate={endDate} onChange={date => setStartDate(date)} />
              </Col>
              <Col lg="2">
                End: <DatePicker selected={endDate} minDate={startDate} maxDate={today()} onChange={date => setEndDate(date)} />
              </Col>
            </Row>
            <div>
              <Table>
                <thead>
                  <tr>
                    <th>Ride Name</th>
                    <th>Date</th>
                    <th>Moving Time</th>
                    <th>Elapsed Time</th>
                    <th>Distance</th>
                    <th>Elevation</th>
                    <th>{rideTypeFilter()}</th>
                    <th>{visibilityFilter()}</th>
                  </tr>
                </thead>
                <tbody>
                  <RideData activityData={activityData} />
                </tbody>
              </Table>
              <Totals activityData={activityData} />
            </div>
          </Container>
        )
      }
    </React.Fragment>
  )
}

export default Activities