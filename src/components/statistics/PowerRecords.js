import React from "react"
import { Bar } from "react-chartjs-2"
import { Container, Row } from "react-bootstrap"
import ScaleLoader from "react-spinners/ScaleLoader"
import { css } from "@emotion/react"
import { PowerLoading } from "./Loading"

const PowerRecords = ({ powerStatistics, tooltips, loading }) => {
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

  const override = css`display: block;margin: auto;border-color: red;`;

  return (
    <Container>
      {
        loading ? (
          <Row>
            <PowerLoading />
          </Row>
        ) : (
          (powerStatistics.length !== 0) ? (
            <Row>
              <Bar data={data} options={options} />
            </Row>
          ) : (
            <React.Fragment>
              <h3>Calculating power records ...</h3>
              <ScaleLoader color="#000000" loading={true} css={override} height={125} width={8} radius={10} margin={10} />
            </React.Fragment>
          )
        )
      }
    </Container>
  )
}

export default PowerRecords