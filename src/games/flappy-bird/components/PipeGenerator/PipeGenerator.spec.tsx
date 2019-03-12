import { mount } from 'enzyme';
import { number } from 'prop-types';
import * as React from 'react';

import Pipe from '../pipe/Pipe';
import PipeGenerator from './PipeGenerator';

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

jest.mock('../pipe/Pipe');


PipeGenerator.contextTypes = {
  scale: number,
  width: number
}

const context = { scale: 1, width: 1000 };

describe('PipeGenerator functionality', async () => {

  let wrapper: any;
  beforeEach(() => {
    wrapper = mount(<PipeGenerator gameState={{ x: -1, gameOver: false, paused: false, debug: false }} />, { context });

  });

  afterEach(() => {
    (window as any).debug = false;
  });

  it("should generate pipes (not debug)", async () => {

    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.children().length).toBe(1);


    await timeout(500);
    // One pipe at start  
    expect(wrapper.find(Pipe).length).toBe(1);

    wrapper.setProps({ gameState: { x: -1450, gameOver: false, paused: false, debug: false } });

    // 3 pipes during the game
    expect(wrapper.find(Pipe).length).toBe(3);
  });

  it("should execute in debug mode)", async () => {

    expect((window as any).autoPilotY).not.toBe(Math.floor(((0.5 * (576 - 176)) + (176 / 2))));

    ((window as any).debug) = true;

    // At first pipe
    wrapper.setProps({ gameState: { x: -600, gameOver: false, paused: false, debug: true } });

    wrapper.update();    
    expect((window as any).autoPilotY).toBe(Math.floor(((0.5 * (576 - 176)) + (176 / 2))));
  });


  it("should not update pipes", async () => {

    wrapper.setProps({gameState: {x: -1, gameOver: false, paused: false, debug: false}})

    const instance = wrapper.instance() as PipeGenerator;

    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.children().length).toBe(1);


    // One pipe at start  
    expect(wrapper.find(Pipe).length).toBe(1);


    // Test to update using identical props
    const props = wrapper.props();
    const nextProps = {...props};
    const shouldNotUpdate = instance.shouldComponentUpdate(nextProps, {});

    // Expect no changes
    expect(shouldNotUpdate).toBe(false);
  });



});