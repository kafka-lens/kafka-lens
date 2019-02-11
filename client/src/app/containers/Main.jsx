// const { ipcRenderer } = require('electron');
import { ipcRenderer } from 'electron';

// import components here
import ConnectionPage from './ConnectionPage.jsx';
import TopicPage from './TopicPage.jsx';

import '../css/index.css';

const React = require('react');

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      uri_input: '',
      validString: 'Hello'
    };

    // bind methods here
    this.validConnectionChecker = this.validConnectionChecker.bind(this);
    this.updateURI = this.updateURI.bind(this);
  }

  // Lifecycle methods
  componentWillMount() {
    // code here
    ipcRenderer.on('topic:getTopics', (e, data) => {
      console.log('receiving data in componentWillMount: ', data);
    });
  }

  // Methods
  validConnectionChecker(event) {
    event.preventDefault();

    ipcRenderer.send('topic:getTopics', this.state.uri_input);

    // if (this.state.validString === this.state.uri_input) {
    //   return this.setState({
    //     connected: true
    //   });
    // }
  }

  updateURI(event) {
    const input = event.target.value;
    this.setState(state => ({ uri_input: input }));
  }

  render() {
    return (
      <div>
        <div>
          {this.state.connected === true ? (
            <TopicPage />
          ) : (
            <ConnectionPage
              validConnectionChecker={this.validConnectionChecker}
              updateURI={this.updateURI}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Main;
