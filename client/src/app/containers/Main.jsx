import { ipcRenderer } from 'electron';

// import components here
import ConnectionPage from './ConnectionPage.jsx';
import TopicPage from './TopicPage.jsx';

import '../css/index.scss';
import '../css/Main.scss';

const React = require('react');

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
    // code here
    ipcRenderer.on('topic:getTopics', (e, data) => {
      this.setState({ isFetching: false });
      if (data === 'Error') {
        this.setState({
          connected: false
        });
      } else {
        this.setState({
          topics: data,
          connected: true
        });
      }
      console.log('logging state', this.state);
    });
  }

  // Methods
  validConnectionChecker(event) {
    event.preventDefault();
    this.setState({
      isFetching: true
    });

    if (this.state.uri_input === 'a') {
      const uri = '157.230.166.35:9092';
      ipcRenderer.send('topic:getTopics', uri);
    } else {
      ipcRenderer.send('topic:getTopics', this.state.uri_input);
    }
  }

  updateURI(event) {
    const input = event.target.value;
    this.setState(state => ({ uri_input: input }));
  }

  render() {
    return (
      <div className="main-div">
        {this.state.connected === true ? (
          <TopicPage uri={this.state.uri_input} topicList={this.state.topics} />
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
