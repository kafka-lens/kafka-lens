import React from 'react';


const BrokerTopic = props => {
  return (
    <div>
        <p>Topic Name: {props.topicName}</p>
        <p>Msg Per Second: {props.newMessagesPerSecond}</p>
      </div>
  );
};

export default BrokerTopic;
