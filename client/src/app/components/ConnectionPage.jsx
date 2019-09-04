import React from 'react';
import PropTypes from 'prop-types';
import '../css/ConnectionPage.scss';
import lensIcon from '../../../../assets/images/lens-icon.png';
import nullableProp from '../../utils/nullableProp';

const ConnectionPage = ({ isFetching, connected, updateURI, validConnectionChecker }) => {
  let loading;
  if (isFetching === true) {
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
  if (connected === false) {
    errorMsg = <p id="error-message">Connection timed out, please check your connection URI.</p>;
  }
  return (
    <div className="connection-box">
      <div className="connection-form container">
        <div className="logo-container">
          <img className="logo" src={lensIcon} alt="" />
        </div>
        <form>
          <div>
            <label htmlFor="uri-input" id="label-instructions">
              Enter Your Kafka Server URI
              <input id="uri-input" type="text" placeholder="localhost:9092" onChange={updateURI} />
            </label>
          </div>
          <button
            id="connect-button"
            className="btn waves-effect waves-light"
            type="submit"
            onClick={validConnectionChecker}
          >
            Connect
          </button>
        </form>
        {/* Error message displays here */}
        {errorMsg}
      </div>
      {/* Loading bars here */}
      <div className="loading-bars">{loading}</div>
      <footer className="footer">
        <p className="FooterText">© Kafka Lens Version 2.0 </p>
      </footer>
    </div>
  );
};

export default ConnectionPage;

ConnectionPage.propTypes = {
  connected: nullableProp(PropTypes.bool).isRequired,
  isFetching: PropTypes.bool.isRequired,
  updateURI: PropTypes.func.isRequired,
  validConnectionChecker: PropTypes.func.isRequired,
};
