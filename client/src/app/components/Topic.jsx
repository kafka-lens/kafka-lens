import React from 'react';
import '../css/Topic.scss';

const Topic = props => {
  return (
    <div>
      <div>
        <span className="topic-name">{props.topicInfo.topic}</span> <br />
        <span>Partitions: {props.topicInfo.partition}</span>
      </div>
      <button
        className="view-button btn waves-effect waves-light"
        id={props.id}
        onClick={props.showPartitions}
      >
        View
      </button>
      <br />
    </div>
  );
};

export default Topic;
