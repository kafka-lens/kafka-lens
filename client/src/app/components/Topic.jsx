import React from 'react';
import '../css/Topic.css';

const Topic = props => {
  return (
    <div className="topic">
      <div>
        <span>Topic Name: {props.topicInfo.topic}</span> <br />
        <span>Partitions: {props.topicInfo.partition}</span>
      </div>
      <br />
    </div>
  );
};

export default Topic;
