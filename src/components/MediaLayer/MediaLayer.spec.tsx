import { mount, ReactWrapper } from 'enzyme';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import MediaLayer from './MediaLayer';


function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('MediaLayer', async () => {

  const offsetWidth = 1920;
  const offsetHeight = 1080;

  let mediaLayer: MediaLayer | null = null;
  let wrapper: ReactWrapper;

  const createClient = (): React.StatelessComponent => {

    // Defines react stateless component that can get the scale: number context on MediaLayer trough context
    const Client = (props: any, context: any) => {

      const scaleTest = typeof context.scale === 'number';
      expect(scaleTest).toBe(true);

      const widthTest = typeof context.scale === 'number';
      expect(widthTest).toBe(true);

      const heightTest = typeof context.scale === 'number';
      expect(heightTest).toBe(true);

      return <div>This is a test!</div>
    }

    Client.contextTypes = {
      scale: PropTypes.number,
    }

    return Client;
  };

  beforeEach(async () => {

    // Neads to be wrapped in a div because it neads to use the:
    // this.container.offsetWidth and this.container.offsetHeight of the parent
    wrapper = mount(<div style={{ width: offsetWidth, height: offsetHeight }}><MediaLayer ref={m => { mediaLayer = m; }}><div /></MediaLayer></div>);
  });

  it('should render four (4) <div /> and be unmounted', async () => {

    await timeout(250);

    // one for the outer div two for the Media layer component and one for the innermost child
    expect(wrapper.find('div').length).toEqual(4);

    const children = wrapper.children;

    expect(children).not.toBeNull();
    expect(children.length).toBe(1);

    expect(mediaLayer).not.toBeNull();

    // Expect two dimensions for 2D
    expect(mediaLayer!.state.dimensions.length).toBe(2);

    await timeout(100);

    const spy = jest.spyOn(mediaLayer!, 'componentWillUnmount');
    wrapper.unmount();

    await timeout(100);

    expect(spy).toBeCalled();
  });

  it('should pass scale, width and height to children trough context (horisontal)', async () => {
    
    const Client = createClient();

    wrapper = mount(<div style={{ width: offsetWidth, height: offsetHeight }}><MediaLayer ref={m => { mediaLayer = m; }}><Client /></MediaLayer></div>);
    mediaLayer = wrapper.children[0] as MediaLayer;

    // Let the MediaLayer scale a few times before continuing
    await timeout(250);
  });
});