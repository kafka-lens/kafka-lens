import PropTypes from 'prop-types';
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
import lensIcon from '../../../../assets/images/lens-icon.png';
import logger from '../../utils/logger';

class TopicPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTopicMetadata: {},
      currentPartitionMetadata: {},
      topicName: '',
      messages: [],
      partitionId: '',
      lastElement: null,
      showingPartitionMetadata: false,
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

    // This will get an object from the main process with the partition data
    // includes: highwaterOffset, earliestOffset, messageCount, leader, and replicas
    ipcRenderer.on('partition:getData', (e, data) => {
      this.setState({ currentPartitionMetadata: data });
    });
  }

  // Called when topic is clicked in order to show partitions
  showPartitions(event) {
    const { topicList } = this.props;
    const topicName = event.target.getAttribute('topicname');
    const topicIndex = parseInt(event.target.id, 10);
    const topicInfo = topicList[topicIndex];

    topicInfo.showPartitions = !topicInfo.showPartitions;

    const { uri: kafkaHostURI } = this.props;
    ipcRenderer.send('partition:getMessages', {
      kafkaHostURI,
      topicName,
    });

    const newState = this.state;

    const { showingPartitionMetadata } = this.state;
    if (showingPartitionMetadata === true) newState.showingPartitionMetadata = false;

    newState.currentTopicMetadata = topicInfo;
    newState.loadingData = true;

    return this.setState(newState);
  }

  showMessages(event) {
    const element = event.target;
    const newTopicName = element.getAttribute('topicname');
    const newPartitionId = element.id;

    logger.log('newTopicName from the partition div:', newTopicName);
    logger.log('newPartitionId:', newPartitionId);

    const { lastElement, partitionId, topicName } = this.state;
    const { uri: kafkaHostURI } = this.props;

    if (newPartitionId === partitionId && newTopicName === topicName && lastElement === element)
      return;

    if (lastElement) lastElement.classList.remove('highlight-this');

    element.classList.add('highlight-this');

    this.setState(
      {
        messages: [],
        topicName: newTopicName,
        partitionId: newPartitionId,
        lastElement: element,
        showingPartitionMetadata: true,
      },
      () => {
        ipcRenderer.send('partition:getMessages', {
          kafkaHostURI,
          partitionId: newPartitionId,
          topicName: newTopicName,
        });

        ipcRenderer.send('partition:getData', {
          kafkaHostURI,
          partitionId: newPartitionId,
          topicName: newTopicName,
        });
      },
    );
  }

  render() {
    const { topicList, isConnected, uri } = this.props;
    const {
      showingPartitionMetadata,
      currentPartitionMetadata,
      partitionId,
      currentTopicMetadata,
      topicName,
      messages,
      loadingData,
    } = this.state;

    const shouldDisplayPartitionMetadata =
      showingPartitionMetadata === true &&
      Object.keys(currentPartitionMetadata).length &&
      messages.length > 0;

    const shouldDisplayMessageInfo = showingPartitionMetadata === true && messages.length > 0;

    const Topics = topicList.map((topicInfo, i) => (
      <Topic
        key={topicInfo.topicName}
        id={i}
        topicInfo={topicInfo}
        showPartitions={this.showPartitions}
        showMessages={this.showMessages}
      />
    ));

    const connected = <h5 className="connection-header">Connected</h5>;
    const disconnected = <h5 className="disconnected-header">Disconnected</h5>;

    return (
      <div className="grid-container">
        <div className="title-bar">Kafka Lens</div>
        <div className="route-bar">
          {logger.log('topicInfo:', currentTopicMetadata)}
          <RouteBar
            partitionId={partitionId}
            topicName={currentTopicMetadata.topicName}
            showingPartitionMetadata={showingPartitionMetadata}
          />
        </div>
        <div className="logo-box">
          <img className="lens-icon" src={lensIcon} alt="kakfa lens logo" />
        </div>
        <div className="topics-header">Topics</div>
        <div className="partition-info">
          {loadingData && messages.length === 0 && <LoadingData />}
          {shouldDisplayPartitionMetadata && (
            <PartitionInfo partitionInfo={currentPartitionMetadata} partitionId={partitionId} />
          )}
        </div>
        {logger.log('messages:', messages)}
        <div className="message-info">
          {shouldDisplayMessageInfo && <MessageInfo lastMessage={messages[0]} />}
        </div>
        <div className="list-display">{Topics}</div>
        <div className="message-box">
          <MessageList topicName={topicName} messageArray={messages} />
        </div>
        <div className="connection-status">
          {isConnected === true ? connected : disconnected}
          <div className="connection-uri">{uri}</div>
        </div>
      </div>
    );
  }
}

export default TopicPage;

TopicPage.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  topicList: PropTypes.arrayOf(PropTypes.object).isRequired,
  uri: PropTypes.string.isRequired,
};
