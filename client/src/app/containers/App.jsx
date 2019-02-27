import React from 'react';

import Main from './Main.jsx';
import Navigation from '../components/Navigation.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Main />
    )
  }
}

export default App;
