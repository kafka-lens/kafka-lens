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
        {loading}
        <div>
          {this.props.connected === false ? (
            <span>Connection timed out, please check your connection URI.</span>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default ConnectionPage;
