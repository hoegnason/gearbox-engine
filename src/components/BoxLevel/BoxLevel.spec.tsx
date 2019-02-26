import { shallow } from 'enzyme';
import * as React from 'react';


import BoxLevel from './BoxLevel';


describe('BoxLevel functionality', () => {
  it('Render a static background', async () => {

    const wrapper = shallow(<BoxLevel />);
    
    expect(wrapper.find('div').length).toBe(2);

  });
});