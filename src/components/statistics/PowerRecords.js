import React from "react"
import { Bar } from "react-chartjs-2"
import { Container, Row } from "react-bootstrap";
const PowerRecords = ({powerStatistics, activities}) => {
  const associatedActivities = powerStatistics.map((powerRecord) => {
    return activities.find((activity) => { return activity.id === powerRecord.data.activity_id });
  })

  const data = {
    labels: powerStatistics.map((powerRecord) => {
      if(powerRecord.duration < 60) {
        return `${powerRecord.duration} seconds`
      } else if(powerRecord.duration === 60){
        return "1 minute"
      } else {
        return `${powerRecord.duration/60} minutes`
      }
    }),
    datasets: [
      {
        data: powerStatistics.map((powerRecord) => { return powerRecord.data.power }),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  }
  const options = {
    tooltips: {
      callbacks: {
        title: function(tooltipItem, data) {
          return `${associatedActivities[tooltipItem[0].index]?.title} (${associatedActivities[tooltipItem[0].index]?.created_at.split(' ')[0]})`
        }
      },
    },
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
        <Bar data={data} options={options}/>
      </Row>
    </Container>
  )
}

export default PowerRecords