import { mount } from 'enzyme';
import * as React from 'react';

import { gameState as defaultProps} from '../BoxGameState/DefaultProps';

import { BoxUI } from './BoxUI';
const context = { scale: 1, width: 1920, height: 1080 };

describe('BoxUI', async () => {


    it('should have no divs', async () => {

        const gameState = {...defaultProps};
        gameState.ready = true;

        const wrapper = mount(<BoxUI gameState={gameState} />, { context });

        // One div for the wrapper div and one div for readyElement and one for scoreElement
        expect(wrapper.find('div').length).toBe(2);
    });

    it('should show gameOver element', () => {
        
        const gameState = {...defaultProps};
        gameState.gameOver = true;
        
        const wrapper = mount(<BoxUI gameState={gameState} />, { context })

        // One div for the wrapper div and one div for readyElement and one for scoreElement
        expect(wrapper.find('div').length).toBe(3);
    });
});