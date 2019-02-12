import { mount } from 'enzyme';
import * as React from 'react';
import { Console } from './Console';


describe('Console functionality', async () => {
    
    it('Console should log', async () => {

      const spy = jest.spyOn(global.console, 'log')
      
      const logger = new Console();

      const now = new Date();
      logger.Log("Hetta er ein test");

      expect(spy).toHaveBeenCalledWith(now,"Hetta er ein test");

      logger.Log("Aftur ein test");
      const ConsoleDisplayer = (props: any, context: any) => {
        const log = logger.getLog().map((text, key) =>{
          return <div key={key}>{text}</div>});

        return <div>{log}</div>;       
      }

      const wrapper = mount(<ConsoleDisplayer />);

      expect(wrapper.find('div').length).toEqual(3);
    });
  });