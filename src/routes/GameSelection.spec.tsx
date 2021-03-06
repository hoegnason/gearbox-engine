import { mount } from 'enzyme';
import * as React from 'react';

import {MemoryRouter } from 'react-router';

import App from '../App'

import BoxGame from '../games/box-game/components/BoxGame'
import FlappyBird from '../games/flappy-bird/components/FlappyBird'
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
});