import { shallow } from 'enzyme';
import * as React from 'react';

import { Console } from './Console';


describe('Console', () => {

  const body = ['This is a test'];
  const date = [new Date()];

  it('should render a <div />', () => {
    const wrapper = shallow(<Console body={body} date={date} />);
    expect(wrapper.find('div').length).toEqual(2); // wrapper div pluss one log div
  });
});