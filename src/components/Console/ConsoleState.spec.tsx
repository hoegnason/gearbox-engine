import { mount } from 'enzyme';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import ConsoleState from './ConsoleState';

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('ConsoleState', async () => {

    it('should render 5 for a <div /> and run component did mount', async () => {

        // 2 divs for ConsoleState, 1 for console, 1 for the componentDidMount this.Log and one for the inner div
        const wrapper = mount(<ConsoleState><div /></ConsoleState>);
        expect(wrapper.find('div').length).toEqual(5);

        const instance = wrapper.instance() as ConsoleState;
        
        const spyComponentDidMount = jest.spyOn(instance, 'componentDidMount');
        instance.componentDidMount();


        await timeout(100);

        expect(spyComponentDidMount).toHaveBeenCalled();
    });

    it('should pass the Log function to children trough context', async () => {

        let hasLoged = false;

        // Defines react stateless component that can accept a GameLoop object trough context
        const Client = (props: any, context: any) => {

            if (!hasLoged) {
                hasLoged = true;
                const test = typeof context.Log === "function";
                expect(test).toBe(true);
    
                context.Log('This is a test!');
            }

            return <div>This is a test!</div>
        }

        Client.contextTypes = {
            Log: PropTypes.func
        }

        const wrapper = mount(<ConsoleState><Client /></ConsoleState>);
        const instance = wrapper.instance() as ConsoleState;

        // Let the ConsoleState component and the client run for a while
        await timeout(250);

        expect(instance.state.messages.length).toBe(2);
    });

});
