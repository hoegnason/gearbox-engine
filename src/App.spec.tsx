import { shallow } from 'enzyme';
import * as React from 'react';

import App from './App';


describe('App', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div').length).toEqual(1);
  });
});