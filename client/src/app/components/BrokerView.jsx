import React from 'react';
import BrokerHeader from '../components/BrokerHeader.jsx';
import BrokerTopicsView from './BrokerTopicsView.jsx';
import '../css/BrokerView.scss';

const BrokerView = ({ isAlive, openSideBar, brokerId, brokerURI, topics }) => {
  const brokerColors = {
    Red: '#DC143C',
    Green: '#90EE90'
  };
  let backgroundColor;
  if (isAlive === false) {
    backgroundColor = brokerColors.Red;
  } else {
    backgroundColor = brokerColors.Green;
  }


  return (
    <div
      className="brokerView"
      onClick={() => openSideBar(brokerId, topics)}
      key={brokerId}
      style={{ backgroundColor: backgroundColor }}
    >
      <BrokerHeader brokerID={brokerId} brokerURI={brokerURI} />
      <BrokerTopicsView topics={topics} />
    </div>
  );
};

export default BrokerView;
