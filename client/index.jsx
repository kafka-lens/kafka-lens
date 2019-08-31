import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import App from './src/app/containers/App';

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept('./src/app/containers/App', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./src/app/containers/App').default;
    render(
      <AppContainer>
        <NextRoot />
      </AppContainer>,
      document.getElementById('app'),
    );
  });
}
