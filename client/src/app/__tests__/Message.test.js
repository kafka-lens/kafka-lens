import React from 'react';
import { shallow } from 'enzyme';

import Message from '../components/Message';

describe('Message.js unit tests', () => {
  let wrapper;
  const props = {
    message: 'Test'
  };
  beforeAll(() => {
    wrapper = shallow(<Message {...props} />);
  });

  it('Should render without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render a div with inner text', () => {
    expect(wrapper.find('div').text()).toEqual('Test');
  });
});
