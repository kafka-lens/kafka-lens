import React from 'react';


const BrokerHeader = props => {
  return (
    <React.Fragment>
      <p className="broker-header" >Broker ID:{props.brokerID}</p>
      <p className="broker-header">URI: {props.brokerURI}</p>
    </React.Fragment>
  );
};

export default BrokerHeader;
