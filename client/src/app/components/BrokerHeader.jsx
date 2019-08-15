import React from 'react';


const BrokerHeader = (props) => (
  <>
    <p className="broker-header">
Broker ID:
      {props.brokerID}
    </p>
    <p className="broker-header">
URI:
      {props.brokerURI}
    </p>
  </>
);

export default BrokerHeader;
