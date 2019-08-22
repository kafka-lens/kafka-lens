import PropTypes from 'prop-types';
import React from 'react';
import '../css/Message.scss';

const Message = ({ message, offset }) => (
  <span>
    <div className="single-message">
      {message}
      <p className="offset-indicator">{offset}</p>
    </div>
  </span>
);

export default Message;

Message.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.any.isRequired,
  offset: PropTypes.number.isRequired,
};
