import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import BrokerView from '../components/BrokerView.jsx';
import SideBar from '../components/Sidebar.jsx';
import '../css/Broker.scss';
import '../css/Sidebar.scss'

class Broker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brokersSnapshots: [],
      sideBarWidth: '0px'
    };

    this.openSideBar = this.openSideBar.bind(this);
    this.closeSidebar = this.closeSideBar.bind(this);
  }

  // create method to parse through our data from the backend and set our new state
  componentDidMount() {
    // channel of listner to retain broker information from the backend and set state
    console.log('Broker Component did mount');

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

      const newBrokersSnapshots = 
        this.state.brokersSnapshots.slice();

      newBrokersSnapshots.push(brokersList);

      this.setState({
        brokersSnapshots: newBrokersSnapshots
      });
    });

    ipcRenderer.send('broker:getBrokers', { kafkaHostURI: this.props.kafkaHostURI });
  }

  openSideBar(){
    console.log('this from Broker:', this);
    console.log('width -> ', this.state.sideBarWidth)
    this.setState({ sideBarWidth: '550px'})
  }

  closeSideBar(){
    console.log('this from Broker:', this);
    this.setState({ sideBarWidth: '0px'})
  }

  render() {
    const brokerViews = [];

    const latestSnapshot = this.state.brokersSnapshots[this.state.brokersSnapshots.length - 1] || [];
    for (let i = 0; i < latestSnapshot.length; i += 1) {
      const brokerObj = latestSnapshot[i];
      brokerViews.push(<BrokerView key={i} openSideBar={this.openSideBar} {...brokerObj} />);
    }

    return (
      <div>
        <div className="broker-grid-container">{brokerViews}</div>
        <SideBar widthSideBar={this.state.sideBarWidth} closeSideBar={this.closeSidebar}/>
      </div>
    )
    // <BrokerHistoricalGraph {... } />
  }
}

export default Broker;
