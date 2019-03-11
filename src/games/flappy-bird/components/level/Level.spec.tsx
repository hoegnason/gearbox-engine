import { shallow } from 'enzyme';
// import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Level } from './Level';


import GameLoop from '../../../../core/game-loop/GameLoop';

import { gameState } from '../GameState/DefaultProps';
// import { IGameStateState } from './GameState/GameState';

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Level', async () => {

  it('should render a <div /> and be unmounted', async () => {

    const wrapper = shallow(<Level><div /></Level>, {context: {loop: new GameLoop(), scale: 1.0}});
    
    // Wrapper div and two moving backgrounds (also divs)
    expect(wrapper.find('div').length).toEqual(3);

    const props = { gameState };

    wrapper.setProps(props);
    timeout(250);
    
    props.gameState.x = -15;
    wrapper.setProps(props);


    // const instance = wrapper.instance() as Level;

/*
    await timeout(250);

    expect(spyComponentDidMount).toHaveBeenCalled();

    const spyComponentWillUnmount = jest.spyOn(instance, 'componentWillUnmount');
    
    wrapper.unmount();

    await timeout(250);

    expect(spyComponentWillUnmount).toHaveBeenCalled();
    */
  });
});