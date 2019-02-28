import React from 'react';
import { shallow } from 'enzyme';

import Message from '../components/Message';

describe('Message.js unit tests', () => {
  let wrapper;
  const props = {
    offset: '5',
    message: 'Test'
  };
  beforeAll(() => {
    wrapper = shallow(<Message {...props} />);
  });

  it('Should render without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render a p tag with inner text', () => {
    expect(wrapper.find('p').text()).toEqual('Test');
  });

  it('Should render an h6 tag with inner text', () => {
    expect(wrapper.find('h6').text()).toEqual('5');
  });
});
