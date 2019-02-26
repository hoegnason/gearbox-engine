
import { shallow } from 'enzyme';
import * as React from 'react';
import { Console } from './Console';

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Console functionality', async () => {
  
    afterEach(() => {
      (window as any).debug = false;
    });

    it('Should display log', async () => {

      const logger = shallow(<Console messages={[]} />);
      expect(logger.find("div").length).toEqual(1);

      const logger2 = shallow(<Console messages={[{body: "Test", date: new Date()}]}/>);

      expect(logger2.find("div").length).toEqual(2);
    });

    it('shoud show component on debug and hide it when not debugging', async () => {

      const logger = shallow(<Console messages={[]} />);
      expect(logger.find("div").length).toEqual(1);

      const wrapperDiv = logger.find('div').first();
      const style = wrapperDiv.get(0).props.style;
      

      expect(style).toHaveProperty('display', 'none');

      timeout(250);

      // Expect to show console when the debug flag is set
      (window as any).debug = true;
      
      // Update props to force rerender
      logger.setProps([
        {body: "Test", date: new Date()},
        {body: "Test2", date: new Date()}
      ]);

      timeout(250);

      const wrapperDivNext = logger.find('div').first();
      const styleNext = wrapperDivNext.get(0).props.style;

      expect(styleNext).toHaveProperty('display', 'block');
    });
  });
