import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import BrokerView from '../components/BrokerView.jsx';
import SideBar from '../components/Sidebar.jsx';
import '../css/Broker.scss';
import '../css/Sidebar.scss';

class Broker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brokersSnapshots: [],
      isSideBarOpen: false,
      selectedBrokerId: null
    };

    this.openSideBar = this.openSideBar.bind(this);
    this.closeSidebar = this.closeSideBar.bind(this);
  }

  // create method to parse through our data from the backend and set our new state
  componentDidMount() {
    // channel of listner to retain broker information from the backend and set state
    ipcRenderer.on('broker:getBrokers', (e, { error, data }) => {
      if (error) {
        console.error('getBrokers ERROR:', error);
        return;
      }
      console.log('Getting new brokers Info:', data);

      const brokersList = Object.values(data);
      brokersList.forEach(broker => {
        const brokerTopicsAsArray = Object.values(broker.topics);
        broker.topics = brokerTopicsAsArray;
      });

      const newBrokersSnapshots = this.state.brokersSnapshots.slice();

      newBrokersSnapshots.push(brokersList);

      this.setState({
        brokersSnapshots: newBrokersSnapshots
      });
    });

    ipcRenderer.send('broker:getBrokers', { kafkaHostURI: this.props.kafkaHostURI });
  }

  getBrokerGraphData(brokerId) {
    const timeStamps = [];
    const topicsDataResult = {};

    for (let i = 0; i < this.state.brokersSnapshots.length; i++) {
      const snapshot = this.state.brokersSnapshots[i];
      const brokerData = snapshot.filter(broker => broker.brokerId === brokerId)[0];
      console.log(`brokerData for brokerId ${brokerId}`, brokerData);

      const elapsedTime = i * 10; // NOT ACCURATE!! Not taking into account the asynchronicity of fetching the data
      timeStamps.push(elapsedTime);

      const topicsSnapshots = brokerData.topics;

      for (let j = 0; j < topicsSnapshots.length; j++) {
        const topicSnapshot = topicsSnapshots[j];

        if (!topicsDataResult.hasOwnProperty(topicSnapshot.topicName))
          topicsDataResult[topicSnapshot.topicName] = [];
        const msgsPerSecondOrNull =
          typeof topicSnapshot.newMessagesPerSecond === 'number'
            ? topicSnapshot.newMessagesPerSecond
            : null;
        topicsDataResult[topicSnapshot.topicName].push(msgsPerSecondOrNull);
      }
    }

    return {
      timeStamps,
      topicsData: topicsDataResult
    };
  }

  openSideBar(brokerId) {
    this.setState({ isSideBarOpen: true, selectedBrokerId: brokerId });
  }

  closeSideBar() {
    this.setState({ isSideBarOpen: false, selectedBrokerId: null });
  }

  render() {
    const brokerViews = [];

    const latestSnapshot =
      this.state.brokersSnapshots[this.state.brokersSnapshots.length - 1] || [];
    for (let i = 0; i < latestSnapshot.length; i += 1) {
      const brokerObj = latestSnapshot[i];
      brokerViews.push(<BrokerView key={i} openSideBar={this.openSideBar} {...brokerObj} />);
    }

    const brokerGraphData =
      this.state.selectedBrokerId !== null
        ? this.getBrokerGraphData(this.state.selectedBrokerId)
        : null;

    const gridMinWidth = this.state.isSideBarOpen ? '70vw' : '100vw';

    return (
      <div style={{ display: 'flex', backgroundColor: '#143546' }}>
        <div className="broker-grid-container" style={{minWidth:  gridMinWidth}}>{brokerViews}</div>
        <SideBar
          isSideBarOpen={this.state.isSideBarOpen}
          closeSideBar={this.closeSidebar}
          brokerGraphData={brokerGraphData}
        />
      </div>
    );
  }
}

export default Broker;
