import { mount } from 'enzyme';
import * as React from 'react';

import {MemoryRouter } from 'react-router';

import App from '../App'

import BoxGame from '../components/Games/BoxGame';
import FlappyBird from '../components/Games/FlappyBird'
import GameSelection from './GameSelection';





describe('Routing functionality', () => {
  it('should open selection', () => {

    const wrapper = mount(
        <MemoryRouter initialEntries={[ '/' ]}>
          <App/>
        </MemoryRouter>
      );
    expect(wrapper.find(GameSelection)).toHaveLength(1);
    expect(wrapper.find(FlappyBird)).toHaveLength(0);
    expect(wrapper.find(BoxGame)).toHaveLength(0);
  });
/*
  it('should open FlappyBird', () => {

    const wrapper = mount(
        <MemoryRouter initialEntries={[ '/flappybird' ]}>
          <App/>
        </MemoryRouter>
      );
    // expect(wrapper.find(GameSelection)).toHaveLength(0);
    expect(wrapper.find(FlappyBird)).toHaveLength(1);
    expect(wrapper.find(BoxGame)).toHaveLength(0);
  });

  it('should open BoxGame', () => {

    const wrapper = mount(
        <MemoryRouter initialEntries={[ '/boxgame' ]}>
          <App/>
        </MemoryRouter>
      );
    // expect(wrapper.find(GameSelection)).toHaveLength(0);
    expect(wrapper.find(FlappyBird)).toHaveLength(0);
    expect(wrapper.find(BoxGame)).toHaveLength(1);
  });*/
});