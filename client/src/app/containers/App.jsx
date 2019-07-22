import { ipcRenderer } from 'electron';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import components here
import Header from '../components/Header.jsx';
import ConnectionPage from '../components/ConnectionPage.jsx';
import TopicPage from './TopicPage.jsx';
import Broker from './Broker.jsx';

import '../css/index.scss';
import '../css/App.scss';

class App extends React.Component {
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
    this.restartConnectionPage = this.restartConnectionPage.bind(this);
  }

  // Lifecycle methods
  componentWillMount() {
    // Listener will receive response from backend main process
    // If response is an error, display error to the user in connection page
    ipcRenderer.on('topic:getTopics', (e, data) => {
      this.setState({ isFetching: false });

      if (typeof data === 'string' && data.startsWith('Error')) {
        console.warn('getTopics Error:', data);
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
      }
    });
  }

  // create function to setState connected to null
  restartConnectionPage(event) {
    this.setState({
      connected: false,
      uri_input: '',
      topics: [],
      isFetching: false
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
    this.setState({ uri_input: input });
  }

  disconnect() {
    this.setState({ connected: null });
  }

  render() {
    return (
      <div className="main-div">
        {this.state.connected === true ? (
          <Router>
            <Header restartConnectionPage={this.restartConnectionPage} />
            <Switch>
              <Route path="/broker" render={props => <Broker />} />
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
              <Route path="/connectionpage" render={() => <ConnectionPage />} />
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

export default App;
