import React from 'react';
import '../css/Topic.scss';

import PartitionList from './PartitionList.jsx';

class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
    };
    // bind methods here
  }

  render() {
    return (
      <div className="topic-header">
        <div id={this.props.id} onClick={this.props.showPartitions}>
          {this.props.topicInfo.topic}
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
