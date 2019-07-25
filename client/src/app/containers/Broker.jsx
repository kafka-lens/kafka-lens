import React, { Component } from 'react';
import { ipcRenderer } from 'electron';

import BrokerView from '../components/BrokerView.jsx';
import '../css/Broker.scss';

class Broker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brokersSnapshots: []
    };
  }

  // create method to parse through our data from the backend and set our new state
  componentDidMount() {
    // channel of listner to retain broker information from the backend and set state
    console.log('Broker Component did mount');

    ipcRenderer.on('broker:getBrokers', (e, { error, data }) => {
      if (error) {
        console.error('getBrokers ERROR:', error);
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

  render() {
    const brokerViews = [];

    const latestSnapshot = this.state.brokersSnapshots[this.state.brokersSnapshots.length - 1];
    for (let i = 0; i < this.state.brokers.length; i += 1) {
      const brokerObj = latestSnapshot[i];
      brokerViews.push(<BrokerView key={i} {...brokerObj} />);
    }

    return <div className="broker-grid-container">{brokerViews}</div>;
    // <BrokerHistoricalGraph {... } />
  }
}

export default Broker;
