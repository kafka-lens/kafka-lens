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
    expect(wrapper).toMatchInlineSnapshot(`
<div
  className="partition-list"
>
  <Partition
    id={0}
    key="0"
  />
  <Partition
    id={1}
    key="1"
  />
  <Partition
    id={2}
    key="2"
  />
  <Partition
    id={3}
    key="3"
  />
  <Partition
    id={4}
    key="4"
  />
  <Partition
    id={5}
    key="5"
  />
  <Partition
    id={6}
    key="6"
  />
  <Partition
    id={7}
    key="7"
  />
</div>
`);
  });

  it('Should render a Partition component', () => {
    expect(wrapper.exists('Partition')).toBe(true);
  });
});
