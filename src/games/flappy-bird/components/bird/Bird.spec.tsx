import { mount } from 'enzyme';
// import * as PropTypes from 'prop-types';
import * as React from 'react';

import GameLoop from '../../../../core/game-loop/GameLoop';
import { PhysicsEngine } from '../../../../core/physics/physics-engine';
import { Bird } from './Bird';


import GameState from '../GameState/GameState';

// import { gameState as defaultProps } from '../GameState/DefaultProps';

// import { Body } from '../body/Body';

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Body', async () => {

    (Bird as any).prototype.resetGame = () => { /* */ };

    (Bird as any).prototype.body = {
        body: {
            bodyID: 1,
            bodyName: 'Bird',
            colided: false,
            dynamic: false,
            height: 0,
            velocity: { x: 0, y: 0 },
            width: 0,
            x: 0,
            y: 0
        }
    }

    const dispatchKey = (key: string): void => {
        const keyboardEvent = new KeyboardEvent('keydown', { key });
        document.dispatchEvent(keyboardEvent);
    };

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

        wrapper = mount(<GameState><Bird /></GameState>, { context: { engine, loop, Log: (message: string) => { /* */ }, scale: 1, width: 1920, height: 1080 } });
        wrapper = wrapper.find(Bird);
    });

    it('should render a <div /> and be unmounted', async () => {

        timeout(250);

        const instance = wrapper.instance() as Bird;
        instance.forceUpdate();

        timeout(250);

        // Number of divs: wrapper, "bird sprite", wrapper in Body and the debug div in body
        expect(wrapper.find('div').length).toBe(4);

        // One for the wrapper and one for the "bird sprite"
        // expect(wrapper.find('div').length).toBe(2);
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

    it('should gameover when hitting the floor or a pylon', async () => {

        const instance = wrapper.instance() as any;

        instance.resetGame = () => { /* */ };

        const body = {
            bodyID: 1,
            bodyName: 'Ground',
            colided: false,
            dynamic: false,
            height: 0,
            velocity: { x: 0, y: 0 },
            width: 0,
            x: 0,
            y: 0
        };

        const scoreColider = {
            bodyID: 99,
            bodyName: 'ScoreColider',
            colided: false,
            dynamic: false,
            height: 0,
            velocity: { x: 0, y: 0 },
            width: 0,
            x: 0,
            y: 0
        };


        instance.colided = false;
        instance.onCollision(body);

        await timeout(1500);

        expect(instance.props.gameState.gameOver).toBe(true);

        instance.colided = false;
        instance.onCollision(scoreColider);

        await timeout(1500);

        expect(instance.props.gameState.score).toBe(1);
    });

    /*
    it('should stop bird if in dev mode', () => {
        
        const instance = wrapper.instance() as any;

        // instance.
    });
    */

    /*
    it('should have a Body component as a child', () => {

        expect(wrapper.find(Body).length).toBe(1);
    });
    */
});