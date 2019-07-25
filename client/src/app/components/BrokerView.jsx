import React from 'react';
import BrokerHeader from '../components/BrokerHeader.jsx';
import BrokerTopicsView from './BrokerTopicsView.jsx';
import '../css/BrokerView.scss';

const BrokerView = ({ isAlive, openSideBar, brokerId, brokerURI, topics }) => {
  // change background color if active is true or false
  // console.log('brokerView props:', props);
  const brokerColors = {
    Red: '#E9573F',
    Green: '#8CC152'
  };
  let backgroundColor;
  if (isAlive === false) {
    backgroundColor = brokerColors.Red;
  } else {
    backgroundColor = brokerColors.Green;
  }

  // console.log('broker backgroundColor:', backgroundColor);

  return (
    <div
      className="brokerView"
      onClick={openSideBar}
      key={brokerId}
      style={{ backgroundColor: backgroundColor }}
    >
      <BrokerHeader brokerID={brokerId} brokerURI={brokerURI} />
      <BrokerTopicsView topics={topics} />
    </div>
  );
};

export default BrokerView;
