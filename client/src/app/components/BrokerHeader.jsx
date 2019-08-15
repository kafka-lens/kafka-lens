import React from 'react';

const BrokerHeader = ({ brokerID, brokerURI }) => (
  <>
    <p className="broker-header">
Broker ID:
      {brokerID}
    </p>
    <p className="broker-header">
URI:
      {brokerURI}
    </p>
  </>
);

export default BrokerHeader;
