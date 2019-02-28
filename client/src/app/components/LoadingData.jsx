import React from 'react';
import '../css/LoadingData.scss';

const LoadingData = props => {
    let loadingMessages = (
      <div className="spinner">
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </div>
    );

  return (
      <div>
          <h6 className="fetching-data-header">Fetching Data ... </h6>
          {loadingMessages}
      </div>
  );
};

export default LoadingData;