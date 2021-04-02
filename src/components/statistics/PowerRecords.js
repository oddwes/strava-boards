import React from "react"
import { Bar } from "react-chartjs-2"
import { Col, Container, Row } from "react-bootstrap";

const PowerRecords = ({powerStatistics}) => {

  const data = {
    labels: powerStatistics.map((powerRecord) => { return powerRecord.duration }),
    datasets: [
      {
        data: powerStatistics.map((powerRecord) => { return powerRecord.power_record }),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  }
  const options = {
    tooltips: { enabled: false },
    title: { display: true, text: 'Power Records', fontSize: 24 },
    legend: { display: false },
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
        <Col>
          <Bar data={data} options={options}/>
        </Col>
      </Row>
    </Container>
  )
}

export default PowerRecords