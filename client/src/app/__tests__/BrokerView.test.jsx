import React from 'react';
import { shallow } from 'enzyme';

import BrokerView from '../components/BrokerView';
import BrokerHeader from '../components/BrokerHeader';

describe('BrokerView.js unit tests', () => {
  let wrapper;
  const props = {
    isAlive: false,
    brokerColors: {
      Red: '#DC143C',
      Green: '#90EE90',
    },
  };

  beforeAll(() => {
    wrapper = shallow(<BrokerView {...props} />);
  });

  it('Should render without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  // test if broker header renders
  it('Should render <BrokerHeader/>', () => {
    expect(wrapper.exists('BrokerHeader')).toEqual(true);
  });

  // test if broker topic view renders
  it('Should render <BrokerTopicsView/>', () => {
    expect(wrapper.exists('BrokerTopicsView')).toEqual(true);
  });

  it('If Broker is inactive, then color should be red', () => {
    expect(wrapper.find('.brokerView').get(0).props.style).toHaveProperty(
      'backgroundColor',
      props.brokerColors.Red,
    );
  });

  it('If Broker is active, then color should be green', () => {
    wrapper.setProps({
      isAlive: true,
    });
    expect(wrapper.find('.brokerView')).toHaveLength(1);
    expect(wrapper.find('.brokerView').get(0).props.style).toHaveProperty(
      'backgroundColor',
      props.brokerColors.Green,
    );
  });
});
