import React from 'react';


const BrokerHeader = props => {
  return (
    <React.Fragment>
      <h1>Broker ID:{props.brokerID}</h1>
      <h4>Broker URI:</h4>
      <p>{props.brokerURI}</p>
    </React.Fragment>
  );
};

export default BrokerHeader;
