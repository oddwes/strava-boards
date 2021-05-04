import React, { useState, useEffect } from "react"
import { Button, ButtonGroup, ButtonToolbar, Col, Container, Row } from "react-bootstrap"
import { Bar } from "react-chartjs-2"
import { getActivityPowerRecords, refreshActivity } from "../../utils/StravaUtil"

const Activity = (props) => {
  const activityData = props.location.state.activity
  const [powerStatistics, setPowerStatistics] = useState([])

  useEffect(() => {
    getActivityPowerRecords({ activityId: activityData.id })
      .then(response => {
        if (response.status === 200) {
          setPowerStatistics(response.data)
        }
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          window.location.href = "/login?redirected=true"
        }
      })
  }, [])

  const data = {
    labels: powerStatistics.map((powerRecord) => {
      if (powerRecord.duration < 60) {
        return `${powerRecord.duration} seconds`
      } else if (powerRecord.duration === 60) {
        return "1 minute"
      } else {
        return `${powerRecord.duration / 60} minutes`
      }
    }),
    datasets: [
      {
        data: powerStatistics.map((powerRecord) => { return powerRecord.power }),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    title: { display: true, text: 'Power Records', fontSize: 24 },
    legend: { display: false },
    tooltips: { enabled: false },
    plugins: {
      datalabels: {
        display: true,
      }
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  return (
    <Container>
      <Row>
        <ButtonToolbar>
          <ButtonGroup className="mr-2">
            <a href={"/activities"}>
              <Button className="p-2" variant="light">Back</Button>
            </a>
          </ButtonGroup>
          <ButtonGroup>
            <Button className="p-2" variant="success" onClick={() => { refreshActivity({ activityStravaId: activityData.id }) }}>Refresh</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Row>
      <Row>
        <Bar data={data} options={options} />
      </Row>
    </Container>
  )
}

export default Activity