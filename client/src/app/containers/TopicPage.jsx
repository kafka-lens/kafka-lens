import React from 'react';
import Topic from '../components/Topic.jsx';
import PartitionInfo from '../components/PartitionInfo.jsx';
import PartitionList from '../components/PartitionList.jsx';
import RouteBar from '../components/RouteBar.jsx';
import MessageList from '../components/MessageList.jsx';
import circularBuffer from 'circular-buffer';

import { ipcRenderer } from 'electron';
import '../css/TopicPage.scss';
import '../css/PartitionList.scss';
import lens_src from '../../../dist/images/lens-icon.png';
import metric_demo from '../../../dist/images/metric-demo3.png';

class TopicPage extends React.Component {
  constructor(props) {
    super(props);
    this.buffer = new circularBuffer(100);
    this.messagesToDisplay = new circularBuffer(100);
    this.state = {
      topics: [],
      topicInfo: {},
      buttonId: -1,
      messages: [],
      hover: false,
      partitionId: '',
      partitionNumber: -1,
      lastElement: '',
      lastParentDiv: ''
    };

    this.showPartitions = this.showPartitions.bind(this);
    this.showMessages = this.showMessages.bind(this);
  }
  // Lifecycle methods

  componentDidMount() {
    //code here
    ipcRenderer.on('partition:getMessages', (e, message) => {
      console.log('logging messages: ', message);

      // Create a copy of the message list from state and unshift the new message to the
      // front of the array.
      // SOMETHING TO TEST: IS CONCAT 
      let newMessage = this.state.messages.slice();
      newMessage.unshift(message);
      this.setState({
        messages: newMessage
      });
      // console.log('logging state messages: ', this.state.messages);
    });
  }
  // Methods
  showPartitions(event) {
    const topicInfo = this.props.topicList;
    const i = parseInt(event.target.id);

    console.log('firing show partitions methood')
    //WORKING ON LOGIC HERE
    // this is how you get parent div of the button clicked
    let parentDiv = event.target.parentElement;
    let lastParentDiv = this.state.lastParentDiv;

    if (topicInfo[i].showPartitions == true) {
      topicInfo[i].showPartitions = false;
    } else {
      topicInfo[i].showPartitions = true;
    }

    // OLD CODE BELOW
    // if (this.state.showPartitions && this.state.buttonId === i) {
    //   return this.setState({
    //     showPartitions: false
    //   });
    // }
    let newState = this.state;
    newState.buttonId = i;
    newState.topicInfo = topicInfo[i];

    console.log('logging this.state.topicInfo: ', this.state.topicInfo)

    return this.setState(newState);
  }

  showMessages(event) {
    const topicName = event.target.getAttribute('topicname');
    const partitionNumber = parseInt(event.target.id);
    const partitionId = topicName + partitionNumber;

    // console.log('fired show messages method')
    // console.log('here is topicName: ', topicName)
    // console.log('partitionNumber is: ', partitionNumber)
    // console.log('partitionId: ', partitionId)
    // console.log('logging event.target: ', event.target)

    let element = event.target;
    let lastElement = this.state.lastElement;

    if (lastElement !== element) {
      if (lastElement !== '') {
        lastElement.classList.remove('highlight-this');
      }
      this.setState({
        lastElement: element
      });
      element.classList.add('highlight-this');
    }

    let uri = this.props.uri;

    if (uri === 'a') {
      uri = '157.230.166.35:9092';
    }
    if (uri === 's') {
      uri = 'k2.tpw.made.industries:9092';
    }
    console.log('logging uri', uri)

    if (partitionId !== this.state.partitionId) {
      this.setState({
        messages: [],
        partitionNumber: partitionNumber,
        partitionId: partitionId
      });
      ipcRenderer.send('partition:getMessages', {
        host: uri,
        topic: topicName,
        partition: partitionNumber
      });
      console.log('logging this.state.partitionNumber: ', partitionNumber)
    }
  }

  render() {
    const Topics = this.props.topicList.map((element, i) => {
      return <Topic key={i} id={i} topicInfo={element} showPartitions={this.showPartitions} shouldDisplayPartitions={this.state.showPartitions} showMessages={this.showMessages}/>;
    });

    let isConnected = this.props.isConnected;
    const connected = (<h5 className="connection-header">Connected</h5>)
    const disconnected = (<h5 className="disconnected-header">Disconnected</h5>)

    let displayUri = this.props.uri;

    if (displayUri === 'a') {
      displayUri = '157.230.166.35:9092';
    }
    if (displayUri === 's') {
      displayUri = 'k2.tpw.made.industries:9092';
    }

    // LOADING MESSAGES INDICATOR
    // let loadingMessages = (
    //   <div class="spinner">
    //     <div class="bounce1" />
    //     <div class="bounce2" />
    //     <div class="bounce3" />
    //   </div>
    // );

    return (

      <div className="grid-container">
        <div className="title-bar">Kafka Lens</div>
        <div className="navi-bar">
          <div className="logo-box">
            <img className="lens-icon" src={lens_src} />
          </div>
          <div className="topics-header">Topics</div>
          <div className="list-display">{Topics}</div>
          <div className="connection-status">
            <div className="connection-header">{isConnected === true ? connected : disconnected}</div>
            <div className="connection-uri">{displayUri}</div>
          </div>
        </div>
        <div className="route-bar">
          <RouteBar topicName={this.state.topicInfo.topic} partitionNumber={this.state.partitionNumber} />
        </div>
        <div className="more-info-box">
          {this.state.messages.length > 1 ? <PartitionInfo lastMessage={this.state.messages[0]} /> : ""}
        </div>
        <div className="message-box">
          <MessageList messageArray={this.state.messages} />
        </div>
        <div className="health-box"></div>
        <div className="metrics-box">
          <img className="metric-demo" src={metric_demo} />
        </div>
      </div>












      // <div className="grid-container">

      //   <div className="title-bar"> Kafka Lens</div>

      //   <div className="navi-bar">
      //     <div className="topic-list"></div>
      //     <div className="connection-status"></div>
      //   </div>

      //   <div className="route-bar"></div>
      //   <div className="info-box"></div>
      //   <div className="message-display"></div>
      //   <div className="metrics"></div>
      //   <div className="health-box"></div>
      // </div>

      // <div className="wrapper">

      //   <div className="side-navigation">
      //     <div className="kafka-logo-box">
      //       <img className="lens-icon" src={lens_src} />
      //     </div>
      //     {/* Show topics list / partition list */}
      //     <div className="topic-partition-list">
      //       {Topics}
      //     </div>
      //   </div>

      //   <div className="more-info-box"></div>

      //   {/* Show messages in box */}
      //   <div className="messages-box">
      //     {this.state.messages.length > 0 ? (
      //           <MessageList messageArray={this.state.messages} />
      //         ) : (
      //           ''
      //         )}
      //   </div>
      //   <div className="metrics-box"></div>
      // </div>







      // !!!!!!!!!! DO NOT REMOVE... BELOW IS PREVIOUS UI CODE !!!!!!!!!!!!!!!!!
      // <div className="topic-page-container">
      //   <div className="topic-list container">{Topics}</div>
      //   <div className="incoming-messages-indicator">
      //     {this.state.messages.length > 0 ? loadingMessages : ''}
      //   </div>
      //   <div className="bottom-container">
      //     <div>
      //       {this.state.showPartitions === true ? (
      //         <PartitionList showMessages={this.showMessages} topicInfo={this.state.topicInfo} />
      //       ) : (
      //         ''
      //       )}
      //     </div>
      //     <div>
            // {this.state.messages.length > 0 ? (
            //   <MessageList messageArray={this.state.messages} />
            // ) : (
            //   ''
            // )}
      //     </div>
      //     <div />
      //   </div>
      // </div>
    );
  }
}

export default TopicPage;
