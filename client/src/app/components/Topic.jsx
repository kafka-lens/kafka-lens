import React from 'react';
import '../css/Topic.css';


class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: []
    };

    //bind methods here
  }
  // Lifecycle methods
  componentDidMount() {
    //code here
  }
  // Methods
 exampleMethod(event) {
    //code here
  }

  render() {
    return (
      <div className="topic">
        <div>
          <span>Topic Name: {this.props.topicInfo.topic}</span> <br />
          <span>Partitions: {this.props.topicInfo.partition}</span>
        </div>
          <button id={this.props.id} onClick={this.props.showPartitions}>View</button>
        <br />
      </div>
    );
  }
}

export default Topic;

