import React from 'react';


const BrokerHeader = props => {
  return (
    <React.Fragment>
      <h1>Broker ID:{props.brokerID}</h1>
      <h1>Broker URI:{props.brokerURI}</h1>
    </React.Fragment>
  );
};

export default BrokerHeader;
