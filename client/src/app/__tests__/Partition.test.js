import React from 'react';
import { shallow } from 'enzyme';

import Partition from '../components/Partition';

describe('Parition.js unit tests', () => {
  let wrapper;

  const props = {
    id: 1
  };

  beforeAll(() => {
    wrapper = shallow(<Partition {...props} />);
  });

  it('Should render without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render a div with inner text equal to Parition', () => {
    expect(wrapper.find('div').text()).toEqual('Partition  1');
  });
});
