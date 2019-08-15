import React from 'react';
import { shallow } from 'enzyme';

import Main from '../containers/Main';

describe('App.js unit tests', () => {
  let wrapper;

  // * MOUNT MAIN COMPONENT BEFORE ALL TESTS
  beforeAll(() => {
    wrapper = shallow(<Main />);
  });

  it('should render without errors', () => {
    expect(wrapper.exists('.main-div')).toEqual(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a single div with class: main-div', () => {
    expect(wrapper.exists('.main-div')).toEqual(true);
  });

  it('should render <ConnectionPage/>', () => {
    expect(wrapper.exists('ConnectionPage')).toEqual(true);
  });

  it('should render <BrowserRouter/> if this.state.connected is true', () => {
    const instance = wrapper.instance();
    expect(instance.state.connected).toBe(null);
    instance.setState({ connected: true });
    expect(instance.state.connected).toBe(true);
    expect(wrapper.exists('BrowserRouter')).toEqual(true);
  });
});
