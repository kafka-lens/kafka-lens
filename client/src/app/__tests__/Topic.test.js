import React from 'react';
import { shallow } from 'enzyme';

import Topic from '../components/Topic';

describe('Topic.js unit tests', () => {
  let wrapper;
  const props = {
    id: 1,
    showPartitions: jest.fn(),
    topicInfo: {
      topic: 'test1',
      partition: 5
    }
  };
  beforeAll(() => {
    wrapper = shallow(<Topic {...props} />);
  });

  it('Should render without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should call showPartitions on click', () => {
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(props.showPartitions).toHaveBeenCalled();
  });
});
