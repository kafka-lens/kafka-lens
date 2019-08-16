import React from 'react';
import { ipcRenderer } from 'electron';
import Topic from '../components/Topic';
import PartitionInfo from '../components/PartitionInfo';
import RouteBar from '../components/RouteBar';
import MessageInfo from '../components/MessageInfo';
import MessageList from '../components/MessageList';
import LoadingData from '../components/LoadingData';

import '../css/TopicPage.scss';
import '../css/PartitionList.scss';
import lens_src from '../../../../assets/images/lens-icon.png';
import logger from '../../utils/logger';

class TopicPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: [],
      topicInfo: {},
      topicName: '',
      messages: [],
      hover: false,
      partitionId: '',
      lastElement: '',
      partitionInfo: {},
      showPartitionInfo: false,
      loadingData: false,
    };

    this.showPartitions = this.showPartitions.bind(this);
    this.showMessages = this.showMessages.bind(this);
  }
  // Lifecycle methods

  componentDidMount() {
    ipcRenderer.on('partition:getMessages', (e, messages) => {
      this.setState({ messages });
    });

    // This will get an object from the main process with the partition data incl. highwaterOffset, earliestOffset, messageCount, leader, and replicas
    ipcRenderer.on('partition:getData', (e, data) => {
      this.setState({ partitionInfo: data });
    });
  }

  // Called when topic is clicked in order to show partitions
  showPartitions(event) {
    const { topicList } = this.props;
    const topicName = event.target.getAttribute('topicname');
    const topicIndex = parseInt(event.target.id);
    const topicInfo = topicList[topicIndex];

    if (topicInfo.showPartitions == true) {
      topicInfo.showPartitions = false;
    } else {
      topicInfo.showPartitions = true;
    }

    ipcRenderer.send('partition:getMessages', {
      kafkaHostURI: this.props.uri,
      topicName,
    });

    const newState = this.state;

    if (this.state.showPartitionInfo === true) {
      newState.showPartitionInfo = false;
    }
    newState.topicInfo = topicInfo;
    newState.loadingData = true;

    return this.setState(newState);
  }

  showMessages(event) {
    const topicName = event.target.getAttribute('topicname');
    logger.log('topicName from the partition div:', topicName);
    const partitionId = parseInt(event.target.id);
    logger.log('partitionId:', partitionId);

    const element = event.target;
    const { lastElement } = this.state;

    const kafkaHostURI = this.props.uri;

    if (lastElement !== element) {
      if (lastElement !== '') {
        lastElement.classList.remove('highlight-this');
      }

      ipcRenderer.send('partition:getMessages', {
        kafkaHostURI,
        topicName,
        partitionId,
      });

      ipcRenderer.send('partition:getData', {
        kafkaHostURI,
        partitionId,
        topicName,
      });
      this.setState({
        lastElement: element,
      });

      element.classList.add('highlight-this');
    }

    if (partitionId !== this.state.partitionId || topicName !== this.state.topicName) {
      this.setState({
        messages: [],
        topicName,
        partitionId,
        showPartitionInfo: true,
      });
    }
  }

  render() {
    const Topics = this.props.topicList.map((element, i) => (
      <Topic
        key={i}
        id={i}
        topicInfo={element}
        showPartitions={this.showPartitions}
        shouldDisplayPartitions={this.state.showPartitions}
        showMessages={this.showMessages}
      />
    ));

    const { isConnected } = this.props;
    const connected = <h5 className="connection-header">Connected</h5>;
    const disconnected = <h5 className="disconnected-header">Disconnected</h5>;

    const displayURI = this.props.uri;

    return (
      <div className="grid-container">
        <div className="title-bar">Kafka Lens</div>
        <div className="route-bar">
          {logger.log('topicInfo:', this.state.topicInfo)}
          <RouteBar
            partitionId={this.state.partitionId}
            topicName={this.state.topicInfo.topicName}
            showPartitionInfo={this.state.showPartitionInfo}
          />
        </div>
        <div className="logo-box">
          <img className="lens-icon" src={lens_src} />
        </div>
        <div className="topics-header">Topics</div>
        <div className="partition-info">
          {this.state.loadingData === true && this.state.messages.length === 0 ? (
            <LoadingData />
          ) : (
            ''
          )}
          {this.state.showPartitionInfo === true &&
          Object.keys(this.state.partitionInfo).length > 1 &&
          this.state.messages.length > 0 ? (
            <PartitionInfo partitionInfo={this.state.partitionInfo} />
          ) : (
            ''
          )}
        </div>
        {logger.log('this.state.messages:', this.state.messages)}
        <div className="message-info">
          {this.state.showPartitionInfo === true && this.state.messages.length > 0 ? (
            <MessageInfo lastMessage={this.state.messages[0]} />
          ) : (
            ''
          )}
        </div>
        <div className="list-display">{Topics}</div>
        <div className="message-box">
          <MessageList topicName={this.state.topicName} messageArray={this.state.messages} />
        </div>
        <div className="connection-status">
          {isConnected === true ? connected : disconnected}
          <div className="connection-uri">{displayURI}</div>
        </div>
      </div>
    );
  }
}

export default TopicPage;
