import React from 'react';
import { shallow } from 'enzyme';

import MessageList from '../components/MessageList';

describe('MessageList.js unit tests', () => {
  let wrapper;
  const props = {
    messageArray: [1, 2, 3, 4, 5],
  };
  beforeAll(() => {
    wrapper = shallow(<MessageList {...props} />);
  });

  it('Should render without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render message components', () => {
    expect(wrapper.exists('Message')).toBe(true);
  });
});
