import React from 'react';
import { shallow } from 'enzyme';

import TopicPage from '../containers/TopicPage';

describe('TopicPage.js unit tests', () => {
  let wrapper;
  const props = {
    topicList: [],
    isConnected: true,
    uri: 'localhost:9092',
  };

  beforeAll(() => {
    wrapper = shallow(<TopicPage {...props} />);
  });

  it('Should render without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render Topic components if there are topics in state', () => {
    expect(wrapper.exists('Topic')).toBeFalsy();
    wrapper.setProps({
      topicList: [
        { topicName: 'topic1', showPartitions: true },
        { topicName: 'topic2' },
        { topicName: 'topic3' },
      ],
    });
    expect(wrapper.exists('Topic')).toBeTruthy();
  });

  it('Should render loading animation if loadingData & this.state.messages.length === 0', () => {
    wrapper.setState({ loadingData: true });
    expect(wrapper.exists('LoadingData')).toBeTruthy();
  });

  it('Should stop loading animation if this.state.messages.lrngth > 0', () => {
    wrapper.setState({
      loadingData: true,
      messages: [{ offset: 1, value: '1' }, { offset: 2, value: '2' }, { offset: 3, value: '3' }],
    });
    expect(wrapper.exists('LoadingData')).toBeFalsy();
  });
});
