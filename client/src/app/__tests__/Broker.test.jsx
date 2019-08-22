import React from 'react';
import { shallow } from 'enzyme';

import Broker from '../containers/Broker';

describe('Broker.jsx unit tests', () => {
  let wrapper;
  const props = {
    kafkaHostURI: 'localhost:9092',
    brokersSnapshots: [{ isAlive: true, brokerId: 5, brokerURI: 'localhost:9092', topics: [] }],
  };

  beforeAll(() => {
    wrapper = shallow(<Broker {...props} />);
  });

  it('Should render without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <BrokerViews/>', () => {
    const instance = wrapper.instance();
    expect(instance.state.brokersSnapshots).toEqual([
      { isAlive: true, brokerId: 5, brokerURI: 'localhost:9092', topics: [] },
    ]);
    wrapper.setState({
      brokersSnapshots: [
        [
          { isAlive: true, brokerId: 1, brokerURI: 'localhost:9092', topics: [] },
          { isAlive: true, brokerId: 2, brokerURI: 'localhost:9092', topics: [] },
          { isAlive: false, brokerId: 3, brokerURI: 'localhost:9092', topics: [] },
        ],
      ],
    });
    expect(wrapper.exists('BrokerView')).toEqual(true);
  });
});
