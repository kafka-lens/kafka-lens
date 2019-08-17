import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import BrokerView from '../components/BrokerView';
import logger from '../../utils/logger';
import SideBar from '../components/Sidebar';
import '../css/Broker.scss';
import '../css/Sidebar.scss';

class Broker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brokersSnapshots: [],
      isSideBarOpen: false,
      selectedBrokerId: null,
      selectedBrokerTopics: [],
    };

    this.openSideBar = this.openSideBar.bind(this);
    this.closeSidebar = this.closeSideBar.bind(this);
  }

  // create method to parse through our data from the backend and set our new state
  componentDidMount() {
    const { brokersSnapshots: initialBrokerSnapshots } = this.props;
    this.setState({
      brokersSnapshots: initialBrokerSnapshots,
    });
    // channel of listener to retain broker information from the backend and set state
    ipcRenderer.on('broker:getBrokers', (e, { error, data }) => {
      if (error) {
        logger.error('getBrokers ERROR:', error);
        return;
      }
      logger.log('Getting new brokers Info:', data);

      const brokersList = Object.values(data);
      for (let i = 0; i < brokersList.length; i++) {
        const broker = brokersList[i];
        broker.topics = Object.values(broker.topics);
      }

      const { brokersSnapshots } = this.state;
      const newBrokersSnapshots = brokersSnapshots.slice();
      newBrokersSnapshots.push(brokersList);

      this.setState({
        brokersSnapshots: newBrokersSnapshots,
      });
    });

    const { kafkaHostURI } = this.props;
    ipcRenderer.send('broker:getBrokers', { kafkaHostURI });
  }

  getBrokerGraphData(brokerId) {
    const timeStamps = [];
    const topicsDataResult = {};
    const { brokersSnapshots } = this.state;

    for (let i = 0; i < brokersSnapshots.length; i++) {
      const snapshot = brokersSnapshots[i];
      const brokerData = snapshot.filter(broker => broker.brokerId === brokerId)[0];
      logger.log(`brokerData for brokerId ${brokerId} at snapshot ${i}:`, brokerData);

      const elapsedTime = i * 10;
      // NOT ACCURATE!! Not taking into account the asynchronicity of fetching the data
      timeStamps.push(elapsedTime);

      const topicsSnapshots = brokerData.topics;

      for (let j = 0; j < topicsSnapshots.length; j++) {
        const topicSnapshot = topicsSnapshots[j];

        if (!Object.hasOwnProperty.call(topicsDataResult, topicSnapshot.topicName))
          topicsDataResult[topicSnapshot.topicName] = [];
        const msgsPerSecondOrNull =
          typeof topicSnapshot.newMessagesPerSecond === 'number'
            ? topicSnapshot.newMessagesPerSecond
            : null;
        topicsDataResult[topicSnapshot.topicName].push(msgsPerSecondOrNull);
      }
    }

    logger.log('topicsDataResult:', topicsDataResult);

    return {
      timeStamps,
      topicsData: topicsDataResult,
    };
  }

  openSideBar(brokerId, topics) {
    this.setState({
      isSideBarOpen: true,
      selectedBrokerId: brokerId,
      selectedBrokerTopics: topics,
    });
  }

  closeSideBar() {
    this.setState({ isSideBarOpen: false, selectedBrokerId: null, selectedBrokerTopics: [] });
  }

  render() {
    const brokerViews = [];

    const { brokersSnapshots } = this.state;
    const latestSnapshot = brokersSnapshots[brokersSnapshots.length - 1] || [];
    for (let i = 0; i < latestSnapshot.length; i += 1) {
      const brokerObj = latestSnapshot[i];
      brokerViews.push(
        <BrokerView
          key={i}
          openSideBar={this.openSideBar}
          isAlive={brokerObj.isAlive}
          brokerId={brokerObj.brokerId}
          brokerURI={brokerObj.brokerURI}
          topics={brokerObj.topics}
        />,
      );
    }

    const { selectedBrokerId } = this.state;
    const brokerGraphData =
      selectedBrokerId !== null ? this.getBrokerGraphData(selectedBrokerId) : null;

    const { isSideBarOpen } = this.state;
    const gridMinWidth = isSideBarOpen ? '70vw' : '100vw';

    const { selectedBrokerTopics } = this.state;
    return (
      <div style={{ display: 'flex', backgroundColor: '#143546' }}>
        <div className="broker-grid-container" style={{ minWidth: gridMinWidth }}>
          {brokerViews}
        </div>
        <SideBar
          isSideBarOpen={isSideBarOpen}
          closeSideBar={this.closeSidebar}
          brokerGraphData={brokerGraphData}
          brokerId={selectedBrokerId}
          brokerTopics={selectedBrokerTopics}
        />
      </div>
    );
  }
}

export default Broker;

Broker.propTypes = {
  brokersSnapshots: PropTypes.arrayOf(
    PropTypes.shape({
      isAlive: PropTypes.bool.isRequired,
      brokerId: PropTypes.number.isRequired,
      brokerURI: PropTypes.string.isRequired,
      topics: PropTypes.array.isRequired,
    }),
  ).isRequired,
  kafkaHostURI: PropTypes.string.isRequired,
};
