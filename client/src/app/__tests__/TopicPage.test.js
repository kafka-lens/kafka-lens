import React from 'react';
import { shallow } from 'enzyme';

import TopicPage from '../containers/TopicPage';

describe('TopicPage.js unit tests', () => {
  let wrapper;
  const props = {
    topicList: []
  };
  beforeAll(() => {
    wrapper = shallow(<TopicPage {...props} />);
  });

  it('Should render without errors', () => {
    expect(wrapper).toMatchSnapshot();
    console.log('wrapppererereprerperper', wrapper);
  });

  it('Should render Topic components if there are topics in state', () => {
    expect(wrapper.exists('Topic')).toBe(false);
    wrapper.setProps({
      topicList: [{ message: 'test1' }, { message: 'test2' }, { message: 'test3' }]
    });
    expect(wrapper.exists('Topic')).toBe(true);
  });

  xit('Should render loading animation if this.state.messages.length > 0', () => {
    const instance = wrapper.instance();
    expect(
      wrapper.containsMatchingElement(
        <div class="spinner">
          <div class="bounce1" />
          <div class="bounce2" />
          <div class="bounce3" />
        </div>
      )
    ).toBeFalsy();
    instance.setState({ messages: [1, 2, 3, 4, 5] });
    expect(
      wrapper.containsMatchingElement(
        <div class="spinner">
          <div class="bounce1" />
          <div class="bounce2" />
          <div class="bounce3" />
        </div>
      )
    ).toBeTruthy();
  });
});
