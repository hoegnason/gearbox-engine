import { mount } from 'enzyme';
import * as React from 'react';


import Box from './Box';

import {PhysicsEngine} from '../../core/physics/physics-engine'

/*
function timeout(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }*/

describe('Box', () => {

  let engine: PhysicsEngine;
  let wrapper: any;

  beforeEach(() => {

    engine = new PhysicsEngine();

    wrapper = mount(<Box />);
  });

  it('should fall', async () => {
    
    const wrapperBox = wrapper.instance() as Box;

    expect(wrapperBox.body.body).not.toBeNull();

    // const oldY = wrapperBox.body.body.y;
    // Unfinished
    
    engine.tick();


  });
});