import React from "react"
import { Bar } from "react-chartjs-2"
import { Container, Row } from "react-bootstrap"
import { PowerLoading } from "./Loading"
import { formatDuration } from "../../utils/TimeUtil"

const PowerRecords = ({ powerStatistics, tooltips, loading, powerProgress }) => {
  const data = {
    labels: powerStatistics.map((powerRecord) => { return formatDuration({duration: powerRecord.duration}) }),
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
    tooltips: tooltips || {},
    title: { display: true, position: "bottom", text: 'Power Records', fontSize: 24 },
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
        { loading ? (<PowerLoading progress={powerProgress} />) : (<Bar data={data} options={options} />) }
      </Row>
    </Container>
  )
}

export default PowerRecords