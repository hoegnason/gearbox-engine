import { shallow } from 'enzyme';
import * as React from 'react';

import GameState from '../../games/flappy-bird/components/GameState/GameState';
import {Level} from '../../games/setur-platformer/Level';
import {Mario} from '../../games/setur-platformer/Mario';
import SeturPlatformer from './SeturPlatformer';




describe('SeturPlatformer', () => {
  it('should render <SeturPlatformer />', () => {
    const wrapper = shallow(<SeturPlatformer />);
    expect(wrapper.find(GameState).length).toBe(1);
    expect(wrapper.find(Level).length).toBe(1);
    expect(wrapper.find(Mario).length).toBe(1);
  });
});