import React from 'react';
import { shallow } from 'enzyme';

import PartitionList from '../components/PartitionList';

describe('PartitionList unit tests', () => {
  let wrapper;
  const props = {
    topicInfo: {
      numberOfPartitions: 8,
      topicName: 'first',
    },
    showMessages: jest.fn(),
  };
  beforeAll(() => {
    wrapper = shallow(<PartitionList {...props} />);
  });

  it('Should render without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render a Partition component', () => {
    expect(wrapper.exists('Partition')).toBe(true);
  });
});
