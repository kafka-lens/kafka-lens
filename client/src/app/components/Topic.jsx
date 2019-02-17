import React from 'react';
import '../css/Topic.scss';

class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: []
    };

    //bind methods here
  }

  render() {
    return (
      <div>
        <div>
          <span className="topic-name">{this.props.topicInfo.topic}</span> <br />
          <span>Partitions: {this.props.topicInfo.partition}</span>
        </div>
        <button
          className="view-button btn waves-effect waves-light"
          id={this.props.id}
          onClick={this.props.showPartitions}
        >
          View
        </button>
        <br />
      </div>
    );
  }
}

export default Topic;
