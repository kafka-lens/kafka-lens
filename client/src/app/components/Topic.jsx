import React from 'react';
import '../css/Topic.css';

// const Topic = props => {
//   console.log('be able to see props: ', props)
//   function showPartitions(e) {
//     console.log('show e.target: ', e.target)
//     console.log('show props: ', props)
//   }
//   return (
//     <div className="topic" topicinfo={props.topicInfo} onClick={showPartitions}>
//       <div>
//         <span>Topic Name: {props.topicInfo.topic}</span> <br />
//         <span>Partitions: {props.topicInfo.partition}</span>
//       </div>
//       <br />
//     </div>
//   );
// };

// export default Topic;

class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: []
    };

    // this.clickTopic = this.clickTopic.bind(this);
    // this.showPartitions = this.showPartitions.bind(this);
  }
  // Lifecycle methods
  componentDidMount() {
    //code here
  }
  // Methods
  // showPartitions(event) {
  //   //code here
  //   // console.log('firing showPartitions function')
  // }
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

