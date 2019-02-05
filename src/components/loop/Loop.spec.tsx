import { shallow } from 'enzyme';
import * as React from 'react';

import Loop from './Loop';

describe('App', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<Loop><div /></Loop>);
    expect(wrapper.find('div').length).toEqual(2);
  });
});