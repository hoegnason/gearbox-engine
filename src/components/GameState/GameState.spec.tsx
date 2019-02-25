import { shallow } from 'enzyme';
import * as React from 'react';

import { PhysicsEngine } from '../../core/physics/physics-engine';
import GameState from './GameState';


function timeout(ms: any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('GameState functionality', async () => {



  it("Should pass updateState to children", async () => {

    const Client = (props: any, context: any) => {

      const test = props.updateState instanceof Function;
      expect(test).toBe(true);

      props.updateState({ x: 1 });



      return <div>This is a test!</div>
    }

    const wrapper = shallow(<GameState><Client /></GameState>, { context: { engine: new PhysicsEngine() } });

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

});