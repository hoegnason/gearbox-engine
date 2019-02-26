import { shallow } from 'enzyme';
import * as React from 'react';

import BoxGame from './BoxGame';


import Box from '../box/Box';
import BoxLevel from '../BoxLevel';
import GameState from '../GameState/GameState';




describe('BoxGame', () => {
  it('should render <BoxGame />', () => {
    const wrapper = shallow(<BoxGame />);
    expect(wrapper.find(GameState).length).toBe(1);
    expect(wrapper.find(BoxLevel).length).toBe(1);
    expect(wrapper.find(Box).length).toBe(1);
  });
});