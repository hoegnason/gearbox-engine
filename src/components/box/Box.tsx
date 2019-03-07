import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Subscription } from 'rxjs';

import { createKeyboardObservable } from '../../core/hid/keyboardSubject';

// import { AudioManager } from '../../core/sound/AudioManager';

import Body from '../body/Body';
import { IBoxGameStateState } from '../BoxGameState/BoxGameState';

import {initGameState} from '../BoxGameState/DefaultProps'


export interface IBoxProps {
  gameState: IBoxGameStateState;
  y: number;
  enabled: boolean;
  addBox?: (y: number) => void;
}

interface IBoxState {
  enabled: boolean;
}

export class Box extends React.Component<IBoxProps, IBoxState> {

  public static displayName = 'Box';

  public static contextTypes = {
    Log: PropTypes.func,
    engine: PropTypes.object,
    height: PropTypes.number,
    loop: PropTypes.object,
    scale: PropTypes.number,
    width: PropTypes.number
  };

  public static defaultProps: IBoxProps = { gameState: initGameState, y: -200, enabled: true  }

  public body: any;

  private keyboardSubscription: Subscription;

  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {

    // AudioManager.loadSoundFile('background_music', require('../../assets/sound/arcade-loop.ogg'), false);
    // AudioManager.playSound('background_music');
    (window as any).debug = true;

    this.context.Log("Component Mounted!")
    this.keyboardSubscription = createKeyboardObservable({ touchKey: ' ' }).subscribe((key: string) => {

      if (' ' === key) {
        this.place();
      }

      if ('ArrowLeft' === key) {
        this.move(false);
    }

    if ('ArrowRight' === key) {
        this.move(true);
    }

    });
    
  }


  public componentWillUnmount() {

    // AudioManager.stopSound('background_music');
    this.keyboardSubscription.unsubscribe();

  }

  public render() {
    return (
      <div>
        <Body bodyName={'Box'} ref={b => { this.body = b; }} dynamic={this.props.enabled} trigger={false} prevX={250} prevY={this.props.y} x={250} y={this.props.y} width={500} height={25} velocity={{ x: 0, y: 0 }} colided={false} />
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

  private move(right: boolean) {

    if (right) {

        if (this.body.body.velocity.x < 0) {
            this.body.body.velocity.x = 0;
        } else if (this.body.body.velocity.x <= 10) {
            this.body.body.velocity.x = 10;
        }
    }
    
    if (!right) {

        if (this.body.body.velocity.x > 0) {
            this.body.body.velocity.x = 0;
        } else if (this.body.body.velocity.x >= -10) {
            this.body.body.velocity.x = -10;
        }
    }
}

  private place() {

    if(null != this.props.gameState.updateState && this.props.enabled){
      if (!this.props.gameState.gameOver && !this.props.gameState.paused) {
        
        this.context.Log("Stopped!")
        if (null != this.props.addBox){
          this.props.addBox(this.body.body.y);
        }
        this.body.body.dynamic = false;
        
        // this.props.gameState.updateState({ y: this.body.body.y, score: this.props.gameState.score!++ });
      }
    }
  }
}

export default Box;
