import { shallow } from 'enzyme';
// import * as PropTypes from 'prop-types';
import * as React from 'react';
import World from './World';


import GameLoop from '../../core/game-loop/GameLoop';

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('World', async () => {

  it('should render a <div /> and be unmounted', async () => {

    const wrapper = shallow(<World><div /></World>, {context: {loop: new GameLoop()}});
    expect(wrapper.find('div').length).toEqual(2);

    const instance = wrapper.instance() as World;

    const spyComponentDidMount = jest.spyOn(instance, 'componentDidMount');
    instance.componentDidMount();

    await timeout(250);

    expect(spyComponentDidMount).toHaveBeenCalled();

    const spyComponentWillUnmount = jest.spyOn(instance, 'componentWillUnmount');
    
    wrapper.unmount();

    await timeout(250);

    expect(spyComponentWillUnmount).toHaveBeenCalled();
  });

  it('should render a <div /> and be unmounted', async () => {

    const gameLoop = new GameLoop();

    const wrapper = shallow(<World gravity={{x: 1, y:5, scale: 0.05}}><div /></World>, {context: {loop: gameLoop}});
    expect(wrapper.find('div').length).toEqual(2);

    const instance = wrapper.instance() as World;

    const spyComponentDidMount = jest.spyOn(instance, 'componentDidMount');
    instance.componentDidMount();

    wrapper.setProps({gravity: {x: 10, y: 10, scale: 0.5}});

    gameLoop.start();

    await timeout(250);

    gameLoop.stop();

    expect(spyComponentDidMount).toHaveBeenCalled();

    const spyComponentWillUnmount = jest.spyOn(instance, 'componentWillUnmount');
    
    wrapper.unmount();

    await timeout(250);

    expect(spyComponentWillUnmount).toHaveBeenCalled();
  });
});