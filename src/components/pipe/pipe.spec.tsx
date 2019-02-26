import { shallow } from 'enzyme';
import * as React from 'react';


import Body from '../body/Body';
import Pipe from './Pipe';


function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const context = {scale: 1, width: 1000};

describe('Pipe functionality', async () => {


      it('should have 3 bodies', async () => {
        const wrapper = shallow(<Pipe x= {10} y={0.5}/>, {context})

        expect(wrapper.find(Body).length).toBe(3);
      });

      it('Should update when changed', async () => {
        const wrapper = shallow(<Pipe x={10} y={0.5}/>, {context})

        const wrapperPipe = wrapper.instance() as Pipe;

        const props = wrapper.props();

        const nextProps = {...props}
        nextProps.x = 100;
        nextProps.y = 0.6;

        const shouldNotUpdate = wrapperPipe.shouldComponentUpdate(nextProps, {});
        expect(shouldNotUpdate).toBe(true);
      });

      it('Should not update if same values', async () => {
        const wrapper = shallow(<Pipe x={1} y={0.5}/>, {context})

        await timeout(200);

        const wrapperPipe = wrapper.instance() as Pipe;

        const props = wrapper.props();

        const nextProps = {...props}
        nextProps.x = 1;
        nextProps.y = 0.5;

        const shouldNotUpdate = wrapperPipe.shouldComponentUpdate(nextProps, {});
        expect(shouldNotUpdate).toBe(false);
      });
});