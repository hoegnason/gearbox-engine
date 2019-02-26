import { shallow } from 'enzyme';
import * as React from 'react';


import Body from '../body/Body';
import Pipe from './Pipe';



const context = {scale: 1, width: 1000};

describe('Pipe functionality', async () => {


      it("should have 3 bodies", async () => {
        const wrapper = shallow(<Pipe x= {10} y={0.5}/>, {context})

        expect(wrapper.find(Body).length).toBe(3);
      });
});