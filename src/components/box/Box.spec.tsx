import { mount } from 'enzyme';
import * as React from 'react';


import Box from './Box';

import {PhysicsEngine} from '../../core/physics/physics-engine'


function timeout(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

describe('Box', () => {


  (Box as any).prototype.body = {
    body: {
        bodyID: 1,
        bodyName: 'Box',
        colided: false,
        dynamic: false,
        height: 0,
        velocity: { x: 0, y: 0 },
        width: 0,
        x: 0,
        y: 0
    }
  }

  let engine: PhysicsEngine;
  let wrapper: any;

  const dispatchKey = (key: string): void => {
    const keyboardEvent = new KeyboardEvent('keydown', { key });
    document.dispatchEvent(keyboardEvent);
};

  beforeEach(() => {

    engine = new PhysicsEngine();

    wrapper = mount(<Box gameState = {{gameOver: false}} y={0} enabled={true}/>, { context: { engine, Log: jest.fn(), scale: 1, width: 1920, height: 1080 } });
  });

  it('should render a <div /> and be unmounted', async () => {

    timeout(250);

    const instance = wrapper.instance() as Box;
    instance.forceUpdate();

    timeout(250);

    // Number of divs: wrapper, 
    expect(wrapper.find('div').length).toBe(4);

    wrapper.unmount();

    // One for the wrapper and one for the "bird sprite"
    // expect(wrapper.find('div').length).toBe(2);
  });


  it('should fall', async () => {
    
    const wrapperBox = wrapper.instance() as Box;

    expect(wrapperBox.body.body).not.toBeNull();

    // const oldY = wrapperBox.body.body.y;
    // Unfinished
    
    engine.tick();


  });

  
  it('should be placed when the space key is pressed', () => {

    const instance = wrapper.instance() as any;

    // Subscribe to the keyboard subject
    instance.componentDidMount();

    const placeSpy = spyOn(instance, 'place');

    expect(placeSpy).not.toBeCalled();

    dispatchKey(' ');

    expect(placeSpy).toBeCalled();
});
});