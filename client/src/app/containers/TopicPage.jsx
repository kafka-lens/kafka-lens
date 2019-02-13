import React from 'react';
import Topic from '../components/Topic.jsx';
import PartitionList from '../components/PartitionList.jsx';

import { ipcRenderer } from 'electron';
import '../css/TopicPage.css'

class TopicPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      topicInfo: {},
      showPartitions: false,
      buttonId: -1,
      messages: []
    };

    this.showPartitions = this.showPartitions.bind(this);
    this.showMessages = this.showMessages.bind(this);
  }
  // Lifecycle methods
  componentDidMount() {
    //code here
    ipcRenderer.on('partition:getMessages', (e, message) => {
      console.log('logging messages: ', message)

      //TEMPORARY
      let newMessage = this.state.messages;
      newMessage.push(message)
      this.setState({
        messages: newMessage
      })
      console.log('logging state messages: ', this.state.messages);
    })
  }
  // Methods
  showPartitions(event) {
    const topicInfo = this.props.topicList;
    const i = parseInt(event.target.id);

    if (this.state.showPartitions && this.state.buttonId === i) {
      return this.setState({
        showPartitions: false
      });
    }
    let newState = this.state
    newState.showPartitions = true;
    newState.buttonId = i;
    newState.topicInfo = topicInfo[i];

    return this.setState(newState)
  }

  showMessages(event) {
    const topicName = event.target.getAttribute('topicname');
    const partitionNumber = parseInt(event.target.id);

    //TEMPORARY
    if (this.state.messages.length > 0) {
      this.setState({
        messages: []
      })
    }


    ipcRenderer.send('partition:getMessages', {})
  }

  render() {
    const Topics = this.props.topicList.map((element, i) => {
      return <Topic key={i} id={i} topicInfo={element} showPartitions={this.showPartitions} />;
    });

    return (
      <div>
        <h1>Active Topics</h1>
        <div className="topic-list">{Topics}</div>
        <div className="partition-list">
          {this.state.showPartitions === true ? (
            <PartitionList topicInfo={this.state.topicInfo} />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default TopicPage;
