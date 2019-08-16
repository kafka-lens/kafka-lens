import PropTypes from 'prop-types';
import React from 'react';
import '../css/Partition.scss';

const Partition = ({ id, showMessages, topicName }) => (
  <div
    id={id}
    className="single-partition"
    role="button"
    tabIndex="0"
    onKeyPress={showMessages}
    onClick={showMessages}
    topicname={topicName}
  >
    {`Partition  ${id}`}
  </div>
);

export default Partition;

Partition.propTypes = {
  id: PropTypes.number.isRequired,
  showMessages: PropTypes.func.isRequired,
  topicName: PropTypes.string.isRequired,
};
