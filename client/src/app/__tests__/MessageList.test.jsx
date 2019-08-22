import React from 'react';
import { shallow } from 'enzyme';

import MessageList from '../components/MessageList';

describe('MessageList.js unit tests', () => {
  let wrapper;
  const props = {
    messageArray: [],
    topicName: 'first',
  };

  beforeAll(() => {
    for (let i = 0; i < 5; i++) {
      props.messageArray.push({ offset: i, value: i.toString() });
    }
    wrapper = shallow(<MessageList {...props} />);
  });

  it('Should render without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render message components', () => {
    expect(wrapper.exists('Message')).toBe(true);
  });
});
