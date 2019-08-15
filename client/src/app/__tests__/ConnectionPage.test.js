import React from 'react';
import { shallow, mount } from 'enzyme';

import ConnectionPage from '../components/ConnectionPage';

describe('Connection.js unit tests', () => {
  let wrapper;
  const props = {
    connected: null,
    isFetching: false,
    updateURI: jest.fn(),
    validConnectionChecker: jest.fn(),
  };
  beforeAll(() => {
    wrapper = shallow(<ConnectionPage {...props} />);
  });
  it('Renders without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should contain a Connect button', () => {
    expect(
      wrapper.containsMatchingElement(
        <button
          id="connect-button"
          className="btn waves-effect waves-light"
          type="submit"
          onClick={props.validConnectionChecker}
        >
          Connect
        </button>,
      ),
    ).toBeTruthy();
  });

  it('Should invoke validConnectionCheck on click', () => {
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(props.validConnectionChecker).toHaveBeenCalled();
  });

  it('Should invoke updateURI on change', () => {
    wrapper
      .find('input')
      .at(0)
      .simulate('change');
    expect(props.updateURI).toHaveBeenCalled();
  });

  it('Should display error message if props.connected is false', () => {
    wrapper.setProps({ connected: false });
    expect(
      wrapper.containsMatchingElement(
        <p id="error-message">Connection timed out, please check your connection URI.</p>,
      ),
    ).toBeTruthy();
  });

  it('Should not display error message if props.connected is not false', () => {
    wrapper.setProps({ connected: null });
    expect(
      wrapper.containsMatchingElement(
        <p id="error-message">Connection timed out, please check your connection URI.</p>,
      ),
    ).toBeFalsy();
  });

  it('Should not display loading bar if props.isFetching is false', () => {
    expect(
      wrapper.containsMatchingElement(
        <div className="loading">
          <div className="loading-bar" />
          <div className="loading-bar" />
          <div className="loading-bar" />
          <div className="loading-bar" />
        </div>,
      ),
    ).toBeFalsy();
  });

  it('Should display loading bar if props.isFetching is true', () => {
    wrapper.setProps({ isFetching: true });
    expect(
      wrapper.containsMatchingElement(
        <div className="loading">
          <div className="loading-bar" />
          <div className="loading-bar" />
          <div className="loading-bar" />
          <div className="loading-bar" />
        </div>,
      ),
    ).toBeTruthy();
  });
});
