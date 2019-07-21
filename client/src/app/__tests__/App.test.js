import React from 'react';
import { shallow, mount } from 'enzyme';

import App from '../containers/App';

describe('App.js unit tests', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<App />);
  });
  it('renders without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a App component', () => {
    expect(wrapper.exists('App')).toEqual(true);
  });
});
