import { shallow } from 'enzyme';
import * as React from 'react';


import Body from '../body/Body';
import Pipe from './Pipe';


const context = { scale: 1, width: 1000 };

describe('Pipe functionality', async () => {

  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(<Pipe x={10} y={0.5} />, { context })
  });


  it('should have 3 bodies', async () => {
    expect(wrapper.find(Body).length).toBe(3);
  });

  it('Should update when changed', async () => {

    wrapper.setProps({x: 50, y: 0.2});

    const wrapperPipe = wrapper.instance() as Pipe;

    const props = wrapper.props();

    const nextProps = { ...props }
    nextProps.x = 100;
    nextProps.y = 0.6;

    const shouldNotUpdate = wrapperPipe.shouldComponentUpdate(nextProps, {});
    expect(shouldNotUpdate).toBe(true);
  });

  it('Should not update if same values', async () => {

    wrapper.setProps({x: 10, y: 0.5});

    const wrapperPipe = wrapper.instance() as Pipe;

    const props = wrapper.props();
    
    const nextProps = { ...props }
    nextProps.x = 10;
    nextProps.y = 0.5;

    const shouldNotUpdate = wrapperPipe.shouldComponentUpdate(nextProps, {});
    expect(shouldNotUpdate).toBe(false);
  });
});