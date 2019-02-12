import { mount, shallow } from 'enzyme';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import GameLoop from './../../core/game-loop/GameLoop';
import Loop from './Loop';

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('App', async () => {

  it('should render a <div /> and be unmounted', async () => {

    const wrapper = shallow(<Loop><div /></Loop>);
    expect(wrapper.find('div').length).toEqual(2);

    const instance = wrapper.instance();
    const nonprivateInstance = instance as any;

    expect(nonprivateInstance.loop.loopID).toBeGreaterThanOrEqual(1);

    const spy = jest.spyOn(instance, 'componentWillUnmount');

    wrapper.unmount();

    expect(spy).toHaveBeenCalled();

    expect(nonprivateInstance.loop.loopID).toBeNull();
  });

  it('should pass GameLoop to children trough context', async () => {
    
    let ticks = 0;

    // Defines react stateless component that can accept a GameLoop object trough context
    const Client = (props: any, context: any) => {

      const test = context.loop instanceof GameLoop;
      expect(test).toBe(true);

      const loop = context.loop as GameLoop;
      loop.subscribe(() => {
        ticks = ticks + 1;
      });

      loop.start();

      return <div>This is a test!</div>
    }

    Client.contextTypes = {
      loop: PropTypes.object,
    }

    const wrapper = mount(<Loop><Client /></Loop>);

    // Let the GameLoop loop a few times before continuing
    await timeout(250);

    const wrappedLoop = (wrapper.instance() as any);
    wrappedLoop.loop.stop();

    // Check that the ticks variable is greater than 0 to check if the loop works correctly
    expect(ticks).toBeGreaterThan(1);
  });

});