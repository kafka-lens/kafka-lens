import React from 'react';
import BrokerHeader from './BrokerHeader';
import BrokerTopicsView from './BrokerTopicsView';
import '../css/BrokerView.scss';

const BrokerView = ({ isAlive, openSideBar, brokerId, brokerURI, topics }) => {
  const brokerColors = {
    Red: '#DC143C',
    Green: '#90EE90',
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
      role="button"
      tabIndex="0"
      onKeyPress={() => openSideBar(brokerId, topics)}
      onClick={() => openSideBar(brokerId, topics)}
      key={brokerId}
      style={{ backgroundColor }}
    >
      <BrokerHeader brokerID={brokerId} brokerURI={brokerURI} />
      <BrokerTopicsView topics={topics} />
    </div>
  );
};

export default BrokerView;
