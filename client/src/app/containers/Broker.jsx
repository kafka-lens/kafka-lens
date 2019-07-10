import React, { Component } from 'react';
import BrokerView from '../components/BrokerView';

class Broker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brokersInfo: []
    };
  }
  // create method to parse through our data from the backend and set our new state
  componentDidMount() {
    // channel of listner to retain broker information from the backend and set state
    ipcRender.on('', (e, data) => {
      this.setState({
        brokersInfo: data
      });
    });
  }

  render() {
    const arr = [];
    for(let i = 0; i < this.state.brokersInfo.length; i += 1) {
      arr.push(<BrokerView individualBroker={this.state.brokersInfo[i]} />)
    return (
      <div>
        {arr} 
      </div>
    );
  }
}

export default Broker;
