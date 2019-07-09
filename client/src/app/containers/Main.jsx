import { ipcRenderer } from 'electron';
import React from 'react';
// const React = require('react');

// import components here
import ConnectionPage from '../components/ConnectionPage.jsx';
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

        const filteredData = data.filter(el => {
          return el.topic !== 'null' && el.topic !== '__consumer_offsets' && el.topic !== 'undefined'
        })

        this.setState({
          topics: filteredData,
          connected: true
        });
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

    let uri = this.state.uri_input;

    ipcRenderer.send('topic:getTopics', uri);

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
