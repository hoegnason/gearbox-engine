import { mount } from 'enzyme';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import GameState from './GameState';

declare const timeout: any; 

describe('GameState functionality', async () => {



    it("Should pass updateState to children", async() =>{
        const Client = (props: any, context: any) => {

            const test = context.updateState instanceof Function;
            expect(test).toBe(true);
  
            const updateState = context.updateState as any;
            updateState(true, 0 ,0);

            
        
            return <div>This is a test!</div>
          }
        
          Client.contextTypes = {
            updateState: PropTypes.func,
            x: PropTypes.number,
            y: PropTypes.number
          }

          const wrapper = mount(<GameState><Client /></GameState>);


          const wrappedFunc = (wrapper.instance() as any);

          const spy = jest.spyOn(wrappedFunc, 'updateState');

          await timeout(250);

          wrappedFunc.updateState(false, 4 , 4);
      
          // Check that the ticks variable is greater than 0 to check if the loop works correctly
          expect(spy).toHaveBeenCalled();

          expect(wrappedFunc.x).toEqual(0);
    });

});