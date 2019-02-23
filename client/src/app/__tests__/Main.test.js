import React from 'react';
import { shallow, mount } from 'enzyme';

import Main from '../containers/Main.jsx';

describe('Main.js unit tests', () => {
  let wrapper;
  // * MOCK STATE
  // const state = {
  //   connected: null,
  //   uri_input: '',
  //   topics: [],
  //   isFetching: false
  // };

  // * MOUNT MAIN COMPONENT BEFORE ALL TESTS
  beforeAll(() => {
    wrapper = shallow(<Main />);
  });

  it('should render without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
