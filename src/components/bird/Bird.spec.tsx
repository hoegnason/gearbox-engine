import { mount } from 'enzyme';
// import * as PropTypes from 'prop-types';
import * as React from 'react';

import GameLoop from '../../core/game-loop/GameLoop';
import { PhysicsEngine } from '../../core/physics/physics-engine';
import { Bird } from './Bird';

// import { Body } from '../body/Body';

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Body', async () => {

    const dispatchKey = (key: string): void => {
        const keyboardEvent = new KeyboardEvent('keydown', { key });
        document.dispatchEvent(keyboardEvent);
    };

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

        wrapper = mount(<Bird />, { context: { engine, loop, Log, scale: 1, width: 1920, height: 1080 } });
    });

    it('should render a <div /> and be unmounted', async () => {

        timeout(250);

        const instance = wrapper.instance() as Bird;
        instance.forceUpdate();

        timeout(250);

        // Number of divs: wrapper, "bird sprite", wrapper in Body and the debug div in body
        expect(wrapper.find('div').length).toBe(4);
    });

    it('should jump when the space key is pressed', () => {

        const instance = wrapper.instance() as any;

        // Subscribe to the keyboard subject
        instance.componentDidMount();

        const jumpSpy = spyOn(instance, 'jump');

        expect(jumpSpy).not.toBeCalled();

        dispatchKey(' ');

        expect(jumpSpy).toBeCalled();
    });

    it('should togglePause when the Esc key is pressed', () => {

        const instance = wrapper.instance() as any;

        // Subscribe to the keyboard subject
        instance.componentDidMount();

        // Test the Esc key
        const togglePauseEscSpy = spyOn(instance, 'togglePause');

        expect(togglePauseEscSpy).not.toBeCalled();
        dispatchKey('Esc');
        expect(togglePauseEscSpy).toBeCalled();
    });

    it('should togglePause when the Escape key is pressed', () => {

        const instance = wrapper.instance() as any;

        // Subscribe to the keyboard subject
        instance.componentDidMount();

        // Test the Escape key
        const togglePauseEscapeSpy = spyOn(instance, 'togglePause');

        expect(togglePauseEscapeSpy).not.toBeCalled();
        dispatchKey('Escape');
        expect(togglePauseEscapeSpy).toBeCalled();
    });

    it('should toggleDebug when the d key is pressed', () => {

        const instance = wrapper.instance() as any;

        // Subscribe to the keyboard subject
        instance.componentDidMount();

        // Test the Escape key
        const togglePauseEscapeSpy = spyOn(instance, 'toggleDebug');

        expect(togglePauseEscapeSpy).not.toBeCalled();
        dispatchKey('d');
        expect(togglePauseEscapeSpy).toBeCalled();
    });

    /*
    it('should have a Body component as a child', () => {

        expect(wrapper.find(Body).length).toBe(1);
    });
    */
});