import React from 'react';
import '../css/ConnectionPage.css';

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
    let loading;
    if (this.props.isFetching === true) {
      loading = (
        <div class="cssload-loader">
          <div class="cssload-dot" />
          <div class="cssload-dot" />
          <div class="cssload-dot" />
        </div>
      );
    }
    return (
      <div id="connection-form-div">
        <form id="connection-form">
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
          {this.props.connected === false ? (
            <p id="error-message">Connection timed out, please check your connection URI.</p>
          ) : (
            ''
          )}
        </form>
        {loading}
      </div>
    );
  }
}

export default ConnectionPage;
