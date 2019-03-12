
import { shallow } from 'enzyme';
import * as React from 'react';

import { PhysicsEngine } from '../../../../core/physics/physics-engine';
import BoxGameState from './BoxGameState';
import { gameState as defaultProps } from './DefaultProps';

function timeout(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

describe('BoxGameState functionality', async () => {

  let engine: PhysicsEngine;
  let Client: any;
  let wrapper: any;

  beforeEach(() => {

    engine = new PhysicsEngine();

    // Component to retreive updateState as props
    Client = (props: any, context: any) => {

      const test = props.updateState instanceof Function;
      expect(test).toBe(true);

      props.updateState({ gameOver: true });



      return <div>This is a test!</div>
    }

    wrapper = shallow(<BoxGameState><Client /></BoxGameState>, { context: { engine } });
  });


  it("Should test the updateState in DefaultProps", () => {

    const gameState = { ...defaultProps };
    
    expect(gameState.updateState).not.toBeNull();
    expect(gameState.updateState).not.toBeUndefined();

    const updateStateSpy = spyOn(gameState, 'updateState');
    gameState.updateState({gameOver: true});
    
    expect(updateStateSpy).toBeCalled();
  });

  it("Should pass updateState to children", async () => {

    const wrappedFunc = (wrapper.instance() as any);
    const wrappedGameState = (wrapper.instance() as BoxGameState);

    expect(wrappedGameState.state.gameOver).toBe(false);

    const spy = jest.spyOn(wrappedFunc, 'updateState');

    await timeout(250);

    wrappedFunc.updateState({ gameOver: true });

    expect(spy).toHaveBeenCalled();

  });

  it("Should not update the component except when the number of children is changed", async () => {

    const instance = (wrapper.instance() as BoxGameState);

    const props = {children: undefined};

    const shouldUpdateUninitialized = instance.shouldComponentUpdate(props, {});
    expect(shouldUpdateUninitialized).toBe(true);

    const shouldUpdateInitialized = instance.shouldComponentUpdate({...props}, {});
    expect(shouldUpdateInitialized).toBe(false);

    const propsNext = {children: React.createElement('div')}

    const shouldUpdateNewChildren = instance.shouldComponentUpdate(propsNext, {});
    expect(shouldUpdateNewChildren).toBe(true);
  });

  it("Should retrieve DefaultProps", async () => {

    const props = {defaultProps};
    expect(props.defaultProps.gameOver).toBe(false);
    expect(props.defaultProps.paused).toBe(false);
    expect(props.defaultProps.ready).toBe(false);
    expect(props.defaultProps.score).toBe(0);
    props.defaultProps.updateState(props.defaultProps);
  });

});