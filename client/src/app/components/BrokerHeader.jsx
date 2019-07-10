import React from 'react';


const BrokerHeader = props => {
  return (
    <h1>Broker ID:{props.brokerID}</h1> // <- will be passed down from container -> broker view
    <h1>Broker URI:{props.brokerURI}</h1> // <- will be passed down from container -> broker view
  );
};

export default BrokerHeader;
