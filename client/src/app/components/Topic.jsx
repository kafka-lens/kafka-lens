import React from 'react';
import '../css/Topic.scss';

import PartitionList from './PartitionList.jsx';

class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
    };
  }

  render() {
    return (
      <div className="topic-header">
        <div
          className="topic-padding"
          id={this.props.id}
          topicname={this.props.topicInfo.topicName}
          onClick={this.props.showPartitions}
        >
          {this.props.topicInfo.topicName}
        </div>
        {this.props.topicInfo.showPartitions === true ? (
          <PartitionList showMessages={this.props.showMessages} topicInfo={this.props.topicInfo} />
        ) : (
          ''
        )}
      </div>
    );
  }
}
export default Topic;
