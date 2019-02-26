import { ipcRenderer } from 'electron';
import React from 'react';
// const React = require('react');

// import components here
import ConnectionPage from './ConnectionPage.jsx';
import TopicPage from './TopicPage.jsx';

import '../css/index.scss';
import '../css/Main.scss';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: null,
      uri_input: '',
      topics: [],
      isFetching: false
    };

    // bind methods here
    this.validConnectionChecker = this.validConnectionChecker.bind(this);
    this.updateURI = this.updateURI.bind(this);
  }

  // Lifecycle methods
  componentWillMount() {
    // Listener will receive response from backend main process
    // If response is an error, display error to the user in connection page
    ipcRenderer.on('topic:getTopics', (e, data) => {
      this.setState({ isFetching: false });
      if (data === 'Error') {
        this.setState({
          connected: false
        });
      } else {
        data.forEach(topic => {
          topic.showPartitions = false;
        });

        this.setState({
          topics: data,
          connected: true
        });
        console.log('logging topics data: ', data);
      }
    });
  }

  // This function is passed to the connection page to send the connection
  // url to the main process to connect to the Kafka cluster
  validConnectionChecker(event) {
    event.preventDefault();
    this.setState({
      isFetching: true
    });

    let uri;
    if (this.state.uri_input === 'a') {
      uri = '157.230.166.35:9092';
      ipcRenderer.send('topic:getTopics', uri);
    } else if (this.state.uri_input === 's') {
      uri = 'k2.tpw.made.industries:9092';
      ipcRenderer.send('topic:getTopics', uri);
    } else {
      uri = this.state.uri_input;
      ipcRenderer.send('topic:getTopics', uri);
    }
  }

  // This function is passed to the connectionPage
  updateURI(event) {
    const input = event.target.value;
    this.setState(state => ({ uri_input: input }));
  }

  render() {
    return (
      <div className="main-div">
        {/* Conditionally renders either the ConnectionPage or TopicPage depending on connected in state */}
        {this.state.connected === true ? (
          <TopicPage
            uri={this.state.uri_input}
            topicList={this.state.topics}
            isConnected={this.state.connected}
          />
        ) : (
          <ConnectionPage
            validConnectionChecker={this.validConnectionChecker}
            updateURI={this.updateURI}
            connected={this.state.connected}
            isFetching={this.state.isFetching}
          />
        )}
      </div>
    );
  }
}

export default Main;
