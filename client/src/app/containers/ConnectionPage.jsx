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
      <div>
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
            className="btn waves-effect waves-light"
            type="submit"
            onClick={this.props.validConnectionChecker}
          >
            Connect
          </button>
        </form>
        <div>{this.props.isFetching === true ? <span>Loading ... standby</span> : ''}</div>
        <div>{this.props.connected === false ? <span>Invalid URI</span> : ''}</div>
      </div>
    );
  }
}

export default ConnectionPage;
