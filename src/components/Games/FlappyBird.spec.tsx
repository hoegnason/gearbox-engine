import { shallow } from 'enzyme';
import * as React from 'react';

import FlappyBird from './FlappyBird';


import Bird from '../bird/Bird';
import GameState from '../GameState/GameState';
import {Level} from '../Level';




describe('FlappyBird', () => {
  it('should render <FlappyBird />', () => {
    const wrapper = shallow(<FlappyBird />);
    expect(wrapper.find(GameState).length).toBe(1);
    expect(wrapper.find(Level).length).toBe(1);
    expect(wrapper.find(Bird).length).toBe(1);
  });
});