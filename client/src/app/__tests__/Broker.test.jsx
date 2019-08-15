import React from 'react';
import { shallow } from 'enzyme';

import Broker from '../containers/Broker';

describe('Broker.js unit tests', () => {
  let wrapper;
  const props = {
    kafkaHostURI: 'localhost:9092',
  };

  beforeAll(() => {
    wrapper = shallow(<Broker {...props} />);
  });

  it('Should render without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <BrokerViews/>', () => {
    const instance = wrapper.instance();
    expect(instance.state.brokers).toEqual([]);
    instance.setState({
      brokers: [{ broker: 'test1' }, { broker: 'test2' }, { broker: 'test3' }],
    });
    expect(wrapper.exists('BrokerView')).toEqual(true);
  });
});
