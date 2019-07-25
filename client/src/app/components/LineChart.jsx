import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';

function getRandomColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return `rgba(${red}, ${green}, ${blue}, 0.2)`;
}

function createDataset({ topicName, msgsPerSecondArray }) {
  const lineColor = getRandomColor();

  return {
    label: topicName,
    fill: false,
    lineTension: 0.1,
    backgroundColor: lineColor,
    borderColor: lineColor,
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: msgsPerSecondArray
  };
}

const LineChart = ({ topicsData }) => {
  // const datasets = [];

  // for (let i = 0; i < topicsData.length; i++) {
  //   const topicData = topicsData[i];
  //   const dataset = createDataset(topicData);
  //   datasets.push(dataset)
  // }

  const data = {
    labels: ['1 sec', '2 secs', '3 secs', '4 secs', '5 secs'],
    datasets: [
      {
        label: 'Topic 1',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [10, 20, 30, 40, 50]
      },
      {
        label: 'Topic 2',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [50, 40, 30, 20, 10]
      },
      {
        label: 'Topic 3',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 0.2)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255, 206, 86, 0.2)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [30, 30, 30, 30, 30]
      }
    ]
  };
  return (
    <div>
      <h1> Line Chart </h1>
      <Line data={data} />
      {/* <Line data2={data} /> */}
    </div>
  );
};

export default LineChart;
