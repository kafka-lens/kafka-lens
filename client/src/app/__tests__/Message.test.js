import React from 'react';
import { shallow } from 'enzyme';

import Message from '../components/Message';

describe('Message.jsx unit tests', () => {
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

  it('Should render a div tag with inner text', () => {
    expect(wrapper.find('div').text()).toEqual('Test5');
  });

  it('Should render a p tag with inner text', () => {
    expect(wrapper.find('p').text()).toEqual('5');
  });
});
