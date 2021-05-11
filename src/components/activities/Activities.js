import React, { useState, useEffect } from 'react'
import { getActivities } from "../../utils/StravaUtil"
import { nMonthsAgo, today } from "../../utils/DateUtil"
import { Container, Col, Row, Table } from 'react-bootstrap'
import { css } from "@emotion/react"
import PropagateLoader from "react-spinners/PropagateLoader"
import Totals from "./Totals"
import RideData from './RideData'

import DateRangePicker from "@wojtekmaj/react-daterange-picker";

const Activities = () => {
  const [activityData, setActivityData] = useState([])
  const [selectedRideType, setSelectedRideType] = useState({})
  const [selectedVisibility, setSelectedVisibility] = useState({})
  const [loading, setLoading] = useState(false)
  const [dateRange, setDateRange] = useState([nMonthsAgo(1), today()]);

  useEffect(() => {
    setLoading(true)
    getActivities({ after: dateRange[0], before: dateRange[1], filters: Object.assign({}, selectedRideType, selectedVisibility) })
    .then(response => {
        if (response.status === 200) {
          const sortedActivityData = response.data.sort(function (a, b) { return new Date(b.created_at) - new Date(a.created_at) })
          setActivityData(sortedActivityData)
          setLoading(false)
        }
      })
      .catch(function (error) {
        if(error.response.status === 401) {
          window.location.href = "/login?redirected=true"
        }
      })
  }, [dateRange, selectedRideType, selectedVisibility])

  const rideTypeChanged = selected => {
    if (selected.target.innerText === "Indoor") {
      setSelectedRideType({ trainer: "true" })
    } else if (selected.target.innerText === "Outdoor") {
      setSelectedRideType({ trainer: "false" })
    }
  }

  const rideTypeFilter = () => {
    if (selectedRideType?.trainer === "true") {
      return <React.Fragment><a href="#" onClick={()=>{setSelectedRideType(null)}} style={{color:"black"}}>Indoor</a> / <a href="#" onClick={rideTypeChanged}>Outdoor</a></React.Fragment>
    } else if (selectedRideType?.trainer === "false") {
      return <React.Fragment><a href="#" onClick={rideTypeChanged}>Indoor</a> / <a href="#" onClick={()=>{setSelectedRideType(null)}} style={{color:"black"}}>Outdoor</a></React.Fragment>
    } else {
      return <React.Fragment><a href="#" onClick={rideTypeChanged}>Indoor</a> / <a href="#" onClick={rideTypeChanged}>Outdoor</a></React.Fragment>
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
      return <React.Fragment><a href="#" onClick={()=>{setSelectedVisibility(null)}} style={{color:"black"}}>Public</a> / <a href="#" onClick={visibilityChanged}>Private</a></React.Fragment>
    } else if (selectedVisibility?.visibility === "only_me") {
      return <React.Fragment><a href="#" onClick={visibilityChanged}>Public</a> / <a href="#" onClick={()=>{setSelectedVisibility(null)}} style={{color:"black"}}>Private</a></React.Fragment>
    } else {
      return <React.Fragment><a href="#" onClick={visibilityChanged}>Public</a> / <a href="#" onClick={visibilityChanged}>Private</a></React.Fragment>
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
            <Row className="justify-content-md-center pb-4">
              <DateRangePicker onChange={setDateRange} value={dateRange} calendarType={"US"} clearIcon={null} format={"y/MM/dd"}/>
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
                    <th></th>
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