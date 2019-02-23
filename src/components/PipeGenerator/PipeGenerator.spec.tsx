import { shallow } from 'enzyme';
import * as React from 'react';

import PipeGenerator from './PipeGenerator';

describe('PipeGenerator functionality', async () => {



    it("Should Generate array of pipes", async () => {

        const wrapper = shallow(<PipeGenerator gameState={{ x: 0 }} />);

        expect(wrapper.find('div').length).toEqual(1)

    });

});