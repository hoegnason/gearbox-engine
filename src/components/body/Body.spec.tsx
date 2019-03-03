import { shallow } from 'enzyme';
// import * as PropTypes from 'prop-types';
import * as React from 'react';

import { PhysicsEngine } from '../../core/physics/physics-engine';
import { Body } from './Body';

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Body', async () => {

    afterEach(() => {
        
        // Reset debug mode!
        (window as any).debug = false;
    });

    it('should render a <div /> and be unmounted', async () => {

        const wrapper = shallow(<Body x={0} y={0} dynamic={false} trigger={false} bodyName={'test'} velocity={{ x: 0, y: 0 }} colided={false} width={100} height={100} prevX={0} prevY={0} />, {
            context: { engine: new PhysicsEngine() }
        });

        // One for the wrapper div and one for the debug div
        expect(wrapper.find('div').length).toEqual(2);

        const props = wrapper.props();

        const instance = wrapper.instance() as Body;

        const nextProps = {...props};
        nextProps.x = 1;
        nextProps.y = 1;

        const shouldComponentUpdateNormal = instance.shouldComponentUpdate(nextProps, {});
        expect(shouldComponentUpdateNormal).toBe(false);

        (window as any).debug = true;
        timeout(100);

        const shouldComponentUpdateDebug = instance.shouldComponentUpdate(nextProps, {});
        expect(shouldComponentUpdateDebug).toBe(true);

        wrapper.setProps({ x: 1, y: 1 });
        wrapper.unmount();
    });
});