import React from 'react';

class ConnectionPage extends React.Component {
  constructor() {
    super();
    this.state = {};

    // bind methods here
  }
  // Lifecycle methods
  componentDidMount() {
    //code here
  }
  // Methods
  exampleMethod(event) {
    //code here
  }
  render() {
    return (
      <form>
        <div>
          <label>Enter Your Kafka Server URI</label>
          <input
            id="uri-input"
            type="text"
            placeholder="ex. http://0.0.0.0:9092"
            onChange={this.props.updateURI}
          />
        </div>
        <button
          id="connect-button"
          type="submit"
          onClick={this.props.validConnectionChecker}
        >
          Connect
        </button>
      </form>
    );
  }
}

export default ConnectionPage;
