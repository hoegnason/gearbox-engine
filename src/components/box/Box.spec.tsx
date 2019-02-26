import { mount } from 'enzyme';
import * as React from 'react';


import Box from './Box';

function timeout(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

describe('Box', () => {
  it('should fall', async () => {

    const wrapper = mount(<Box />);
    
    const wrapperBox = wrapper.instance() as Box;

    expect(wrapperBox.body.body).not.toBeNull();

    
    await timeout(300);


  });
});