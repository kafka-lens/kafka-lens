import React from 'react';
import { shallow } from 'enzyme';

import PartitionList from '../components/PartitionList';

describe('ParitionList unit tests', () => {
  let wrapper;
  const props = {
    topicInfo: {
      partition: 8
    }
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
