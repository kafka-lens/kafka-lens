import React from 'react';
import Topic from '../components/Topic.jsx';
import PartitionInfo from '../components/PartitionInfo.jsx';
import PartitionList from '../components/PartitionList.jsx';
import RouteBar from '../components/RouteBar.jsx';
import MessageInfo from '../components/MessageInfo.jsx';
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
      topicName: '',
      buttonId: -1,
      messages: [],
      hover: false,
      partitionId: '',
      partitionNumber: -1,
      lastElement: '',
      lastParentDiv: '',
      infoBoxData: {},
      showPartitionInfo: false
    };

    this.showPartitions = this.showPartitions.bind(this);
    this.showMessages = this.showMessages.bind(this);
  }
  // Lifecycle methods

  componentDidMount() {
    //code here
    ipcRenderer.on('partition:getMessages', (e, messages) => {
      // console.log('logging message: ', messages)
      this.setState({messages})
    });

    // This will get an object from the main process with the partition data incl. highwaterOffset, earliestOffset, and messageCount
    ipcRenderer.on('partition:getData', (e, data) => {
      console.log('logging infoBoxData ...... : ', data)
      this.setState({infoBoxData: data})
    })
  }
  
  // Called when topic is clicked in order to show partitions
  showPartitions(event) {
    const topicInfo = this.props.topicList;
    const topicName = event.target.getAttribute('topicname');
    const i = parseInt(event.target.id);

    // console.log('logging event.target after clicking topic: ', event.target);

    // this is how you get parent div of the button clicked
    let parentDiv = event.target.parentElement;
    let lastParentDiv = this.state.lastParentDiv;

    if (topicInfo[i].showPartitions == true) {
      topicInfo[i].showPartitions = false;
    } else {
      topicInfo[i].showPartitions = true;
    }

    let uri = this.props.uri;
    // Below code is for quick testing startup
    if (uri === 'a') {
      uri = '157.230.166.35:9092';
    }
    if (uri === 's') {
      uri = 'k2.tpw.made.industries:9092';
    }

    ipcRenderer.send('partition:getMessages', {
      host: uri,
      topic: topicName,
    });

    // console.log('here is uri: ', uri)
    // console.log('here is topicName: ', topicName);

    let newState = this.state;

    if (this.state.showPartitionInfo === true) {
      newState.showPartitionInfo = false;
    }

    newState.buttonId = i;
    newState.topicInfo = topicInfo[i];

    return this.setState(newState);
  }

  showMessages(event) {
    const topicName = event.target.getAttribute('topicname');
    const partitionNumber = parseInt(event.target.id);
    const partitionId = topicName + partitionNumber;

    
    let element = event.target;
    let lastElement = this.state.lastElement;

    let uri = this.props.uri;
    // Below code is for quick testing startup
    if (uri === 'a') {
      uri = '157.230.166.35:9092';
    }
    if (uri === 's') {
      uri = 'k2.tpw.made.industries:9092';
    }
    
    if (lastElement !== element) {
      if (lastElement !== '') {
        lastElement.classList.remove('highlight-this');
      }
      // console.log('sending partition:getData event to backend ............')
      ipcRenderer.send('partition:getData', {kafkaHost: uri, partition: partitionNumber, topic: topicName})
      this.setState({
        lastElement: element
      });
      element.classList.add('highlight-this');
    }

    if (partitionId !== this.state.partitionId) {
      this.setState({
        messages: [],
        topicName: topicName,
        partitionNumber: partitionNumber,
        partitionId: partitionId,
        showPartitionInfo: true
      });



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

    // LOADING MESSAGES INDICATOR ! DO NOT DELETE !
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
        <div className="route-bar">
          <RouteBar topicName={this.state.topicInfo.topic} showPartitionInfo={this.state.showPartitionInfo} partitionNumber={this.state.partitionNumber} />
        </div>
        <div className="logo-box">
          <img className="lens-icon" src={lens_src} />
        </div>
        <div className="topics-header">Topics</div>
        <div className="partition-info">
          {this.state.showPartitionInfo === true && Object.keys(this.state.infoBoxData).length > 1 ? <PartitionInfo infoBoxData={this.state.infoBoxData} partitionNumber={this.state.partitionNumber} /> : ""}
        </div>
        <div className="message-info">
        {this.state.showPartitionInfo === true && this.state.messages.length > 1 ? <MessageInfo lastMessage={this.state.messages[0]} /> : ""}
        </div>
        <div className="list-display">{Topics}</div>
        <div className="message-box">
          <MessageList partitionNumber={this.state.partitionNumber} topicName={this.state.topicName} messageArray={this.state.messages} />
        </div>
        <div className="connection-status">
          {isConnected === true ? connected : disconnected}
          <div className="connection-uri">{displayUri}</div>
        </div>
      </div>

      // <div className="grid-container">
      //   <div className="title-bar">Kafka Lens</div>
      //   <div className="navi-bar">
      //     <div className="logo-box">
      //       <img className="lens-icon" src={lens_src} />
      //     </div>
      //     <div className="topics-header">Topics</div>
      //     <div className="list-display">{Topics}</div>
      //     <div className="connection-status">
      //       <div className="connection-header">{isConnected === true ? connected : disconnected}</div>
      //       <div className="connection-uri">{displayUri}</div>
      //     </div>
      //   </div>
      //   <div className="route-bar">
      //     <RouteBar topicName={this.state.topicInfo.topic} partitionNumber={this.state.partitionNumber} />
      //   </div>
      //   <div className="more-info-box">
      //     {this.state.messages.length > 1 ? <PartitionInfo lastMessage={this.state.messages[0]} /> : ""}
      //   </div>
      //   <div className="message-box">
      //     <MessageList partitionNumber={this.state.partitionNumber} topicName={this.state.topicName} messageArray={this.state.messages} />
      //   </div>
      //   <div className="health-box"></div>
      //   <div className="metrics-box">
      //     <img className="metric-demo" src={metric_demo} />
      //   </div>
      // </div>
    );
  }
}

export default TopicPage;
