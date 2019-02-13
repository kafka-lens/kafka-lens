import React from 'react';

import Main from './Main.jsx';
import Navigation from '../components/Navigation.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // bind methods here
  }

  // Lifecycle methods
  componentDidMount() {
    // code here
  }

  // Methods
  exampleMethod(event) {
    // code here
  }

  render() {
    const divStyle = {
      height: '100%'
    };
    return (
      <div style={divStyle}>
        <Main />
      </div>
    );
  }
}

export default App;
