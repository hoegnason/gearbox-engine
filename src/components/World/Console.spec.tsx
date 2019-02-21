/*
import { shallow } from 'enzyme';
import * as PropTypes from 'prop-types';
import * as React from 'react';
// import World from '../World';
import { Console } from './Console';

describe('Console functionality', async () => {
    
    it('Should display log', async () => {
      jest.mock('./Console', () => ({
        Console: 'mockConsole'
      }));

      const logger = shallow(<Console />);
      expect(logger.find("div").length).toEqual(0);

      // const world = shallow(<World/>);
      // expect(world.find('mockConsole').length).toEqual(1);

      const logger2 = shallow(<Console body={["test"]} timestamp={""}/>);

      expect(logger2.find("div").length).toEqual(2);
    });

    it('should pass Log function to children', async () => {
  
      jest.mock('../loop/Loop', () => ({
        loop: 'mockLoop'
      }));

      // Defines react stateless component that can accept a GameLoop object trough context
      const Client = (props: any, context: any) => {
  
        const world = context.Log as any;
        world("Hetta er ein test");

        return <div>This is a test!</div>
      }
  
      Client.contextTypes = {
        Log: PropTypes.func,
      }
      
      /* 
      // Call passed Log() function
      const wrapper = mount(<World><Client /></World>);

      const wrappedLog = (wrapper.instance() as any);
      const spy2 = jest.spyOn(wrappedLog, 'Log');
      wrappedLog.Log("Aftur ein test");

      expect(spy2).toHaveBeenCalled();*//*
    });
  });*/

  // test
