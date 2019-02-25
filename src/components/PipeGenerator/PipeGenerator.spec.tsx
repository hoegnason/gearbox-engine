import { mount } from 'enzyme';
import {number} from 'prop-types';
import * as React from 'react';

import Pipe from '../pipe/Pipe';
import PipeGenerator from './PipeGenerator';

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

jest.mock('../pipe/Pipe');
// let childContainerProps: any;


PipeGenerator.contextTypes={
    scale: number,
    width: number
}

const context = {scale: 1, width: 1000};

describe('PipeGenerator functionality', async () => {


      it("should generate pipes (not debug)", async () => {
        const wrapper = mount(<PipeGenerator gameState={{ x: -1, gameOver: false, paused: false, debug:false }}/>, { context });

        expect(wrapper.find('div').length).toBe(1);
        expect(wrapper.children().length).toBe(1);

        
        await timeout(500);
        // One pipe at start  
        expect(wrapper.find(Pipe).length).toBe(1);

        wrapper.setProps({gameState:{ x: -1450, gameOver: false, paused: false, debug:true }});
 
        // 3 pipes during the game
        expect(wrapper.find(Pipe).length).toBe(3);
      });

      it("should execute debug mode)", async () => {
        const wrapper = mount(<PipeGenerator gameState={{ x: -1, gameOver: false, paused: false, debug:true }}/>, { context });

        expect(wrapper.find('div').length).toBe(1);
        expect(wrapper.children().length).toBe(1);

        
        await timeout(500);
        // One pipe at start  
        expect(wrapper.find(Pipe).length).toBe(1);

        wrapper.setProps({gameState:{ x: -3860, gameOver: false, paused: false, debug:true }});;
        
        await timeout(500);
        // 3 pipes during the game
        expect(wrapper.find(Pipe).length).toBe(3);
      });


      it("should not update pipes", async () => {
        const wrapper = mount(<PipeGenerator gameState={{ x: -1, gameOver: false, paused: false, debug:false }}/>, { context });

        expect(wrapper.find('div').length).toBe(1);
        expect(wrapper.children().length).toBe(1);

        
        await timeout(500);
        // One pipe at start  
        expect(wrapper.find(Pipe).length).toBe(1);

        wrapper.setProps({gameState:{ x: -1, gameOver: false, paused: false, debug:false }});


        // Expect no changes
        expect(wrapper.find(Pipe).length).toBe(1);
      });

      

});