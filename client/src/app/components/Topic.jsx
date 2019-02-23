import React from 'react';
import '../css/Topic.scss';

import PartitionList from '../components/PartitionList.jsx';

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

      <div className="topic-header" id={this.props.id} onClick={this.props.showPartitions}>
        {this.props.topicInfo.topic}
        {this.props.topicInfo.showPartitions === true ? <PartitionList showMessages={this.props.showMessages} topicInfo={this.props.topicInfo} /> : ""}
      </div>
      // !!!!!!!!!! DO NOT REMOVE... BELOW IS PREVIOUS UI CODE !!!!!!!!!!!!!!!!!
      // <div>
      //   <div>
      //     <span className="topic-name">{this.props.topicInfo.topic}</span> <br />
      //     <span>Partitions: {this.props.topicInfo.partition}</span>
      //   </div>
      //   <button
      //     className="view-button btn waves-effect waves-light"
      //     id={this.props.id}
      //     onClick={this.props.showPartitions}
      //   >
      //     View
      //   </button>
      //   <br />
      // </div>
    );
  }
}

export default Topic;
