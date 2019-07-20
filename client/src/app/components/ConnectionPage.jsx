import React, { useState, useEffect} from 'react';
import '../css/ConnectionPage.scss';
 

const ConnectionPage = props => {

  useEffect(() => {
    console.log(`hello`)
  })

  let loading;
  if (props.isFetching === true) {
    loading = (
      <div className="loading">
        <div className="loading-bar" />
        <div className="loading-bar" />
        <div className="loading-bar" />
        <div className="loading-bar" />
      </div>
    );
  }

  // This handles connection timeouts for Kafka cluster
  let errorMsg;
  if (props.connected === false) {
    errorMsg = <p id="error-message">Connection timed out, please check your connection URI.</p>;
  }
  return (
    <div className="connection-box">
      <div className="connection-form container">
        <form>
          <div>
            <label id="label-instructions">Enter Your Kafka Server URI</label>
            <input id="uri-input" type="text" onChange={props.updateURI} />
          </div>
          <button
            id="connect-button"
            className="btn waves-effect waves-light"
            type="submit"
            onClick={props.validConnectionChecker}
          >
            Connect
          </button>
        </form>
        {/* Error message displays here */}
        {errorMsg}
      </div>
      {/* Loading bars here */}
      <div className="loading-bars">{loading}</div>
    </div>
  );
};

export default ConnectionPage;
