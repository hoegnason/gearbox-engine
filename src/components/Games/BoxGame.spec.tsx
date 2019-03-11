import { shallow } from 'enzyme';
import * as React from 'react';

import BoxGame from './BoxGame';


import BoxDropper from '../BoxDropper/BoxDropper';
import BoxGameState from '../BoxGameState/BoxGameState';
import BoxLevel from '../BoxLevel/BoxLevel';

describe('BoxGame', () => {
  it('should render <BoxGame />', () => {
    const wrapper = shallow(<BoxGame />);
    expect(wrapper.find(BoxGameState).length).toBe(1);
    expect(wrapper.find(BoxLevel).length).toBe(1);
    expect(wrapper.find(BoxDropper).length).toBe(1);
  });
});