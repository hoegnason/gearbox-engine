import { shallow } from 'enzyme';
import * as React from 'react';

import { PhysicsEngine } from '../../../../core/physics/physics-engine';
import { gameState as defaultProps } from './DefaultProps';
import GameState from './GameState';

function timeout(ms: any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('GameState functionality', async () => {

  let engine: PhysicsEngine;
  let Client: any;
  let wrapper: any;

  beforeEach(() => {

    engine = new PhysicsEngine();

    Client = (props: any, context: any) => {

      const test = props.updateState instanceof Function;
      expect(test).toBe(true);

      props.updateState({ x: 1 });



      return <div>This is a test!</div>
    }

    wrapper = shallow(<GameState><Client /></GameState>, { context: { engine } });
  });


  it("Should test the updateState in DefaultProps", () => {

    const gameState = { ...defaultProps };
    
    expect(gameState.updateState).not.toBeNull();
    expect(gameState.updateState).not.toBeUndefined();

    const updateStateSpy = spyOn(gameState, 'updateState');
    gameState.updateState({x: 1});
    
    expect(updateStateSpy).toBeCalled();
  });

  it("Should pass updateState to children", async () => {

    const wrappedFunc = (wrapper.instance() as any);
    const wrappedGameState = (wrapper.instance() as GameState);

    expect(wrappedGameState.state.x).toBe(0);

    const spy = jest.spyOn(wrappedFunc, 'updateState');

    await timeout(250);

    wrappedFunc.updateState({ x: 1 });

    // Check that the ticks variable is greater than 0 to check if the loop works correctly
    expect(spy).toHaveBeenCalled();

    expect(wrappedGameState.state.x).toBe(1);

  });

  it("Should not update the component except when the number of children is changed", async () => {

    const instance = (wrapper.instance() as GameState);

    const props = {children: undefined};

    const shouldUpdateUninitialized = instance.shouldComponentUpdate(props, {});
    expect(shouldUpdateUninitialized).toBe(true);

    const shouldUpdateInitialized = instance.shouldComponentUpdate({...props}, {});
    expect(shouldUpdateInitialized).toBe(false);

    const propsNext = {children: React.createElement('div')}

    const shouldUpdateNewChildren = instance.shouldComponentUpdate(propsNext, {});
    expect(shouldUpdateNewChildren).toBe(true);
  });

  it("Should update x on loop", async () => {

    const instance = wrapper.instance();

    const oldX = instance.state.x;

    timeout(250);
    engine.tick();

    expect(instance.state.x).not.toBe(oldX);
  });

});