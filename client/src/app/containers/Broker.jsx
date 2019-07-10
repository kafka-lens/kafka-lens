import React, { Component } from 'react';
import BrokerView from '../components/BrokerView.jsx';

class Broker extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  /*
  // create method to parse through our data from the backend and set our new state
  componentDidMount() {
    // channel of listner to retain broker information from the backend and set state
    ipcRender.on('', (e, data) => {
      this.setState({
        brokers: data
      });
    });
  }
  */

  render() {
    const arr = [];
    for (let i = 0; i < this.state.brokers.length; i += 1) {
      arr.push(<BrokerView key={i} {...this.state.brokers[i]} />);
    }
    return <div>{arr}</div>;
  }
}

export default Broker;
