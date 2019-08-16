import PropTypes from 'prop-types';
import React from 'react';
import { Line } from 'react-chartjs-2';
import logger from '../../utils/logger';
import '../css/Sidebar.scss';

function getRandomColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return `rgba(${red}, ${green}, ${blue}, 0.2)`;
}

function createDataset(topicName, msgsPerSecondArray) {
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
    data: msgsPerSecondArray,
  };
}

const LineChart = ({ timeStamps, topicsData, brokerId }) => {
  const datasets = Object.entries(topicsData).map(([topicName, msgsPerSecondArray]) =>
    createDataset(topicName, msgsPerSecondArray),
  );

  logger.log('datasets:', datasets);

  const data = {
    labels: timeStamps,
    datasets,
  };
  return (
    <div>
      <h1 className="brokerId"> Broker ID #{brokerId} History </h1>
      <Line data={data} />
    </div>
  );
};

export default LineChart;

LineChart.propTypes = {
  brokerId: PropTypes.number.isRequired,
  timeStamps: PropTypes.arrayOf().isRequired,
  topicsData: PropTypes.objectOf().isRequired,
};
