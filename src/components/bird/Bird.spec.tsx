import { mount } from 'enzyme';
// import * as PropTypes from 'prop-types';
import * as React from 'react';

import GameLoop from '../../core/game-loop/GameLoop';
import { PhysicsEngine } from '../../core/physics/physics-engine';
import { Bird } from './Bird';


function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Body', async () => {

    const Log = () => { /* */ };
    let loop: GameLoop
    let engine: PhysicsEngine;
    let wrapper: any;

    afterEach(() => {
        (window as any).debug = false;
    });

    beforeEach(() => {

        (window as any).debug = false;

        loop = new GameLoop();
        engine = new PhysicsEngine();
        
        wrapper = mount(<Bird />, {context: {engine, loop, Log, scale: 1, width: 1920, height: 1080}});
    });

    it('should render a <div /> and be unmounted', async () => {

        timeout(250);

        const instance = wrapper.instance() as Bird;
        instance.forceUpdate();

        timeout(250);

        // Number of divs: wrapper, "bird sprite", wrapper in Body and the debug div in body
        expect(wrapper.find('div').length).toBe(4);
    });
});