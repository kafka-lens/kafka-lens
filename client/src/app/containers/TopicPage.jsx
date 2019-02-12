import React from 'react';
import Topic from '../components/Topic.jsx';

class TopicPage extends React.Component {
  constructor() {
    super();
    this.state = {
      topics: []
    };

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
    const Topics = this.props.topicList.map((element, i) => {
      console.log('im in loop');
      return <Topic key={i} topicInfo={element} />;
    });

    return (
      <div>
        <h1>Active Topics</h1>
        <div>{Topics}</div>
      </div>
    );
  }
}

export default TopicPage;
