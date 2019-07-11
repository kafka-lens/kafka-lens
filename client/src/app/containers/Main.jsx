import { ipcRenderer } from 'electron';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// const React = require('react');

// import components here
import Header from '../components/Header.jsx';
import ConnectionPage from '../components/ConnectionPage.jsx';
import TopicPage from './TopicPage.jsx';
import Broker from './Broker.jsx';

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

        const filteredData = data.filter(topic => {
          return (
            topic.topicName !== 'null' &&
            topic.topicName !== '__consumer_offsets' &&
            topic.topicName !== 'undefined'
          );
        });

        console.log('getTopics filteredData:', filteredData);

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
    /*{ Conditionally renders either the ConnectionPage or TopicPage depending on connected in state
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
        )} }*/

    return (
      <div className="main-div">
        {this.state.connected === true ? (
          <Router>
            <Header />
            <Switch>
              <Route
                path="/"
                render={() => (
                  <TopicPage
                    uri={this.state.uri_input}
                    topicList={this.state.topics}
                    isConnected={this.state.connected}
                  />
                )}
              />
              <Route path="/broker" render={props => <Broker />} />
            </Switch>
          </Router>
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
