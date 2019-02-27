import * as PropTypes from 'prop-types';
import * as React from 'react';

import { AudioManager } from '../../core/sound/AudioManager';

import Body from '../body/Body';
import { IGameStateState } from '../GameState/GameState';

import { gameState } from '../GameState/DefaultProps';

interface IBoxProps {
  gameState: IGameStateState;
}

export class Box extends React.Component<IBoxProps, {}> {

  public static displayName = 'Box';

  public static contextTypes = {
    Log: PropTypes.func,
    engine: PropTypes.object,
    height: PropTypes.number,
    loop: PropTypes.object,
    scale: PropTypes.number,
    width: PropTypes.number
  };

  public static defaultProps: IBoxProps = { gameState };

  public body: any;

  constructor(props: any) {
    super(props);

  }

  public componentDidMount() {

    AudioManager.loadSoundFile('background_music', "assets/sound/arcade-loop.ogg", false);
    AudioManager.playSound('background_music');
    
  }

  public componentWillUnmount() {

    AudioManager.stopSound('background_music');

  }

  public render() {

    return (
      <div>
        <Body bodyName={'Box'} ref={b => { this.body = b; }} dynamic={true} x={250} y={0} width={25} height={25} velocity={{ x: 0, y: 0 }} colided={false} />
        <div style={{ ...this.getStyles(), backgroundColor: 'green', width: Math.floor(500 * this.context.scale), height: Math.floor(25 * this.context.scale) }} />
      </div>
    );
  }


  private getStyles(): React.CSSProperties {

    if (null != this.body) {
      return {
        position: 'absolute',
        transform: `translate(${Math.floor((this.body.body.x * this.context.scale))}px, ${Math.floor((this.body.body.y * this.context.scale))}px)`,
        transformOrigin: 'left top',
      };
    }

    return {};
  }
}

export default Box;
