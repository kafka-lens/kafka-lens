import React, { Component } from 'react';
import { ipcRenderer } from 'electron';

import BrokerView from '../components/BrokerView.jsx';
import '../css/Broker.scss';

class Broker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kafkaHostURI: 'localhost:9092',
      brokers: [
        {
          brokerId: 1,
          brokerURI: 'localhost:test',
          isAlive: true,
          topics: [{ topicName: 'testName', newMessagesPerSecond: 15 }]
        },
        {
          brokerId: 2,
          brokerURI: 'localhost:test2',
          isAlive: false,
          topics: [
            { topicName: 'testTopic1', newMessagesPerSecond: 15 },
            { topicName: 'testTopic2', newMessagesPerSecond: 2340 }
          ]
        }
      ]
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

      const brokersList = Object.values(data);
      brokersList.forEach(broker => {
        const brokerTopicsAsArray = Object.values(broker.topics);
        broker.topics = brokerTopicsAsArray;
      })
      this.setState({
        brokers: brokersList
      });
    });

    ipcRenderer.send('broker:getBrokers', { kafkaHostURI: this.state.kafkaHostURI });
  }

  render() {
    const arr = [];
    for (let i = 0; i < this.state.brokers.length; i += 1) {
      arr.push(<BrokerView key={i} {...this.state.brokers[i]} />);
    }
    return <div className="broker-grid-container" >{arr}</div>;
  }
}

export default Broker;
