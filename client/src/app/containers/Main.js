const React = require('react');

//import components here
import ConnectionPage from './ConnectionPage';
import TopicPage from './TopicPage';
import '../css/index.css';

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
  componentDidMount() {
    //code here
  }
  // Methods
  validConnectionChecker(event) {
    //code here
    event.preventDefault();
    if (this.state.validString === this.state.uri_input) {
      return this.setState({
        connected: true
      });
    }
  }

  updateURI(event) {
    const input = event.target.value;
    this.setState(state => {
      return { uri_input: input };
    });
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
