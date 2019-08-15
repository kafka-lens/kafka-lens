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

  xit('should render <BrokerViews/>', () => {
    const instance = wrapper.instance();
    expect(instance.state.brokersSnapshots).toEqual([]);
    wrapper.setState({
      brokersSnapshots: [{ broker: 'test1' }, { broker: 'test2' }, { broker: 'test3' }],
    }, () => {
      wrapper.update();
      console.log('Broker wrapper after setting state:', wrapper.debug());
      expect(wrapper.exists('BrokerView')).toEqual(true);
    });
  });
});
