import React from 'react';
import PropTypes from 'prop-types';
import BrokerHeader from './BrokerHeader';
import BrokerTopicsView from './BrokerTopicsView';
import '../css/BrokerView.scss';

const brokerColors = {
  Red: '#DC143C',
  Green: '#90EE90',
};

const BrokerView = ({ isAlive, openSideBar, brokerId, brokerURI, topics }) => {
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

BrokerView.propTypes = {
  isAlive: PropTypes.bool.isRequired,
  openSideBar: PropTypes.func.isRequired,
  brokerId: PropTypes.number.isRequired,
  brokerURI: PropTypes.string.isRequired,
  topics: PropTypes.arrayOf(PropTypes.object).isRequired,
};
