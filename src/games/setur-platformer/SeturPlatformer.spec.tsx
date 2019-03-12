import { shallow } from 'enzyme';
import * as React from 'react';

import GameState from '../flappy-bird/components/GameState/GameState';
import {Level} from './Level';
import {Mario} from './Mario';
import SeturPlatformer from './SeturPlatformer';


// Skal hetta slettast?

describe('SeturPlatformer', () => {
  it('should render <SeturPlatformer />', () => {
    const wrapper = shallow(<SeturPlatformer />);
    expect(wrapper.find(GameState).length).toBe(1);
    expect(wrapper.find(Level).length).toBe(1);
    expect(wrapper.find(Mario).length).toBe(1);
  });
});