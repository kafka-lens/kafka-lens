import React from 'react';


const BrokerTopic = props => {
  return (
    <div>
        <h1>Topic Name: {props.topicName}</h1>
        <h1>Msg Per Second: {props.messagesPerSecond}</h1>
      </div>
  );
};

export default BrokerTopic;
