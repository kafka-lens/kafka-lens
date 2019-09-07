import React from 'react';
import { shallow } from 'enzyme';

import Message from '../components/Message';

describe('Message.jsx unit tests', () => {
  let wrapper;
  const props = {
    offset: 5,
    message: 'Test',
  };
  beforeAll(() => {
    wrapper = shallow(<Message {...props} />);
  });

  it('Should render without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render two p tags', () => {
    expect(wrapper.find('p')).toHaveLength(2);
  });

  it('Should render message-content with inner text "Test"', () => {
    expect(wrapper.find('.message-content').text()).toBe('Test');
  });

  it('Should render message-content with inner text "Test"', () => {
    expect(wrapper.find('.offset-indicator').text()).toBe('5');
  });
});
