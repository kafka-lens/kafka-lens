import React from 'react';
import '../css/ConnectionPage.scss';

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
        <div className="loading">
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
        </div>
      
      );
    }
    let errorMsg;
    if (this.props.connected === false) {
      errorMsg = (
        <p id="error-message">Connection timed out, please check your connection URI.</p>
      )
    }
    return (
      <div className="container connection-box">
        <div></div>


            <div>
              <form>
                <div>
                  <label>Enter Your Kafka Server URI</label>
                  <input
                    id="uri-input"
                    type="text"
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
              {errorMsg}
              <div className="loading-bars">{loading}</div>
          </div>
        <div></div>
      </div>
    );
  }
}

export default ConnectionPage;
