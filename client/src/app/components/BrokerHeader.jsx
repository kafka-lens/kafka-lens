import React from 'react';
import PropTypes from 'prop-types';

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

BrokerHeader.propTypes = {
  brokerID: PropTypes.number.isRequired,
  brokerURI: PropTypes.string.isRequired,
};
