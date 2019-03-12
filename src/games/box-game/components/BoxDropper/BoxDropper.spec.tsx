import { mount } from 'enzyme';
import { number, object } from 'prop-types';
import * as React from 'react';

import Box from '../box/Box';
import BoxDropper from './BoxDropper';


jest.mock('../box/Box');


BoxDropper.contextTypes = {
    loop: object,
  scale: number,
  width: number,
  
}

const context = { loop: {start: jest.fn(), stop: jest.fn()}, scale: 1, width: 1000 };

describe('BoxDropper functionality', async () => {

  let wrapper: any;
  beforeEach(() => {
    wrapper = mount(<BoxDropper gameState={{ gameOver: false, paused: false}} />, { context });

  });

  afterEach(() => {
    (window as any).debug = false;
  });

  it("should render Boxes", async () => {

    expect(wrapper.find(Box).length).toBe(1);

    const wrapperBoxDropper = wrapper.instance() as BoxDropper;

    wrapperBoxDropper.addBox(100);
    wrapperBoxDropper.addBox(150);


    wrapperBoxDropper.forceUpdate();
    wrapper.update();

    wrapper.setProps({gameState: {gameOver: false}});

    expect(wrapper.find(Box).length).toBe(3);


  });

  it("should clear Boxes when game over", async () => {

    expect(wrapper.find(Box).length).toBe(1);

    const wrapperBoxDropper = wrapper.instance() as BoxDropper;

    wrapperBoxDropper.addBox(100);
    wrapperBoxDropper.addBox(150);


    wrapperBoxDropper.forceUpdate();
    wrapper.update();

    wrapper.setProps({gameState: {gameOver: true}});

    expect(wrapper.find(Box).length).toBe(1);


  });


});