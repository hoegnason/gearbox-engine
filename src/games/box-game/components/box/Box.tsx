import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Subscription } from 'rxjs';

import { createKeyboardObservable } from '../../../../core/hid/keyboardSubject';

// import { AudioManager } from '../../core/sound/AudioManager';

import Body from '../../../../components/body/Body';
import { IBoxGameStateState } from '../BoxGameState/BoxGameState';

import { gameState } from '../BoxGameState/DefaultProps'

import { IBody } from '../../../../core/physics/physics-engine'


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

  public static defaultProps: IBoxProps = { gameState, y: -20, enabled: true }

  public body: any;

  private keyboardSubscription: Subscription;

  constructor(props: any) {
    super(props);

    this.onCollision = this.onCollision.bind(this);
  }

  public componentDidMount() {

    // AudioManager.loadSoundFile('background_music', require('../../assets/sound/arcade-loop.ogg'), false);
    // AudioManager.playSound('background_music');
    (window as any).debug = true;

    this.context.Log("Component Mounted!")

    this.keyboardSubscription = createKeyboardObservable({ touchKey: ' ' }).subscribe((key: string) => {

      if (' ' === key) {
        if (!this.props.gameState.gameOver && !this.props.gameState.paused) {
          this.place();
        }
        if (this.props.gameState.gameOver) {
          this.resetGame();
        }
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
        <Body bodyName={'Box'} ref={b => { this.body = b; }}
              dynamic={this.props.enabled} trigger={false} 
              prevX={250} prevY={this.props.y}
              x={250} y={this.props.y} 
              width={500} height={60} 
              velocity={{ x: 0, y: -8 }}
              colided={false} onCollision={this.onCollision} />
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

  private onCollision(bodyColidedWith: IBody): void {

    if ('Box' === bodyColidedWith.bodyName || 'Floor' === bodyColidedWith.bodyName) {

      if (this.props.gameState.updateState != null && !this.props.gameState.gameOver) {
        this.context.Log("Crashed! GameOver!");
        this.props.gameState.updateState({ gameOver: true });
      }


    }
  }

  private place() {

    if (null != this.props.gameState.updateState && this.props.enabled) {
      if (!this.props.gameState.gameOver && !this.props.gameState.paused) {

        this.context.Log("Stopped!")
        if (null != this.props.addBox && !this.props.gameState.gameOver) {
          if (this.props.gameState.score != null) {
            this.props.gameState.updateState({ score: this.props.gameState.score + 1 });
          }

          this.props.addBox(this.body.body.y);
        }
        this.body.body.dynamic = false;
      }
    }
  }

  private resetGame() {

    this.body.body.y = 0;
    this.body.body.x = 250;

    this.body.body.velocity.x = 0;
    this.body.body.velocity.y = 0;

    this.props.gameState.updateState!({
      gameOver: false,
      paused: false,
      ready: false,
      score: 0
    });

    this.context.loop.start();

  }

}

export default Box;
