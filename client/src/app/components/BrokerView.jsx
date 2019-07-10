import React from 'react';
import BrokerHeader from '../components/BrokerHeader';
import BrokerTopicsView from './BrokerTopicsView';

const BrokerView = props => {
  // change background color if active is true or false
  
  return (
    <div>
      <BrokerHeader brokerID={props.individualBroker.brokerId} brokerURI={props.individualBroker.brokerURI} />
      <BrokerTopicsView topics={props.individualBroker.topics} />
    </div>
  );
};

export default BrokerView;
