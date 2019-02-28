import React from 'react';
import { shallow } from 'enzyme';

import Partition from '../components/Partition';

describe('Parition.js unit tests', () => {
  let wrapper;
  const props = {
    id: '5',
    showMessages: jest.fn(),
    topicName: 'Test'
  };

  beforeAll(() => {
    wrapper = shallow(<Partition {...props} />);
  });

  it('Should render without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render a div with inner text equal to Parition', () => {
    expect(wrapper.find('div').text()).toEqual('Partition  5');
  });

  it('Should call showMessages on click', () => {
    wrapper
      .find('div')
      .at(0)
      .simulate('click');
    expect(props.showMessages).toHaveBeenCalled();
  });
});
