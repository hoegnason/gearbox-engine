import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Subscription } from 'rxjs';

import { createKeyboardObservable } from '../../core/hid/keyboardSubject';

import { AudioManager } from '../../core/sound/AudioManager';

import GameLoop from '../../core/game-loop/GameLoop';
import Body from '../body/Body';


import { IGameStateState } from '../GameState/GameState';

import { IBody } from '../../core/physics/physics-engine';

import { gameState } from '../GameState/DefaultProps';

let scoreColiderID: number = 0;

interface IBirdProps {
  gameState: IGameStateState;
}

export class Bird extends React.Component<IBirdProps, {}> {

  public static displayName = 'Bird';

  public static contextTypes = {
    Log: PropTypes.func,
    engine: PropTypes.object,
    height: PropTypes.number,
    loop: PropTypes.object,
    scale: PropTypes.number,
    width: PropTypes.number
  };

  public static defaultProps: IBirdProps = { gameState }

  public body: any;

  private keyboardSubscription: Subscription;

  private colided = false;

  constructor(props: any) {
    super(props);

    this.onCollision = this.onCollision.bind(this);
    this.doUpdate = this.doUpdate.bind(this);
  }


  public componentDidMount() {

    AudioManager.loadSoundFile('wing', "assets/sound/flapping_wing.ogg", false);
    AudioManager.loadSoundFile('hit', "assets/sound/hit.ogg", false);
    AudioManager.loadSoundFile('die', "assets/sound/hit.ogg", false);
    AudioManager.loadSoundFile('point', "assets/sound/point.ogg", false);
    AudioManager.loadSoundFile('game_over', "assets/sound/game_over.ogg", false);

    // this.setGameOver(false);

    this.keyboardSubscription = createKeyboardObservable({ touchKey: ' ' }).subscribe((key: string) => {

      if (' ' === key) {
        this.jump();
      }

      if ('Esc' === key || 'Escape' === key) {
        this.togglePause();
      }

      if ('d' === key) {
        this.toggleDebug();
      }

      if ('1' === key) {
        if (null != this.props.gameState && null != this.props.gameState.updateState && null != this.props.gameState.scrollSpeed) {
          this.props.gameState.updateState({ scrollSpeed: this.props.gameState.scrollSpeed + 10 });

          // tslint:disable-next-line:no-console
          console.log('scrollSpeed: ', this.props.gameState.scrollSpeed);
        }
      }

      if ('2' === key) {
        if (null != this.props.gameState && null != this.props.gameState.updateState && null != this.props.gameState.scrollSpeed) {
          this.props.gameState.updateState({ scrollSpeed: this.props.gameState.scrollSpeed - 10 });
        }
      }

    });
  }

  public componentWillUnmount() {

    if (null != this.keyboardSubscription) {
      this.keyboardSubscription.unsubscribe();
    }
  }

  public render() {

    if (this.props.gameState.debug) {
      this.body.body.y = ((window as any).autoPilotY) || 288;

      this.body.body.velocity.x = 0;
      this.body.body.velocity.y = 0;
    }

    const xOffset = Math.floor(((this.context.width / this.context.scale) * 0.2));
    const yOffset = Math.floor((this.context.height / this.context.scale) * 0.25);

    if (!this.props.gameState.ready && (this.props.gameState.x! < -300)) {
      this.props.gameState.ready = true;
    }

    return (
      <div>
        <Body bodyName={'Bird'} ref={b => { this.body = b; }} onUpdate={this.doUpdate} onCollision={this.onCollision} dynamic={this.props.gameState.ready!} x={xOffset} y={yOffset} width={25} height={25} velocity={{ x: 0, y: 0 }} colided={false} />
        <div style={{ ...this.getStyles(), backgroundColor: 'red', width: Math.floor(25 * this.context.scale), height: Math.floor(25 * this.context.scale) }} />
      </div>
    );
  }

  private jump() {

    if (!this.props.gameState.ready) {
      this.props.gameState.updateState!({ ready: true });
    }

    if (!this.props.gameState.gameOver) {
      this.body.body.velocity.y = -15;
      AudioManager.playSound('wing');
      this.context.Log("Jump!!");
    }
  }

  private showPausedUI(show: boolean) {
    this.props.gameState.updateState!({ paused: show });
  }

  private toggleDebug(): void {

    this.props.gameState.debug = !this.props.gameState.debug;
    (window as any).debug = this.props.gameState.debug;

    if ((window as any).debug) {

      this.context.Log('debugging enabled!');
    } else {

      this.context.Log('debugging disabled!');
    }
  }

  private togglePause(): void {

    if (null != this.context && null != this.context.loop) {

      const loop = this.context.loop as GameLoop;

      if (null != this.props.gameState.updateState && !this.props.gameState.gameOver) {

        if (this.props.gameState.paused) {

          loop.start();
          this.props.gameState.updateState({ paused: false });
          this.showPausedUI(false);
        } else {

          loop.stop();
          this.props.gameState.updateState({ paused: true });
          this.showPausedUI(true);
        }
      }
    }
  }

  private doUpdate(): void {

    if (this.props.gameState.debug && null != this.body && null != this.body.body && null != this.context.height && null != this.context.scale) {

      this.body.body.y = ((window as any).autoPilotY);
    }
  }

  private onCollision(bodyColidedWith: IBody): void {

    if ('ScoreColider' === bodyColidedWith.bodyName && scoreColiderID !== bodyColidedWith.bodyID) {

      scoreColiderID = bodyColidedWith.bodyID || 0;

      this.props.gameState.updateState!({ score: this.props.gameState.score! + 1 });

      this.context.Log(`gameState.score: ${this.props.gameState.score}`);

      AudioManager.playSound('point');
    }

    if ('Ground' === bodyColidedWith.bodyName || 'Pipe' === bodyColidedWith.bodyName) {

      if (!this.colided) {

        this.context.Log(`Bird colided with: ${bodyColidedWith.bodyName}!`);

        AudioManager.playSound('hit');

        this.context.loop.stop();

        this.props.gameState!.updateState!({ gameOver: true });

        setTimeout(() => {
          this.body.body.y = 0;
          this.body.body.x = Math.floor(((this.context.width / this.context.scale) * 0.2));

          this.body.body.velocity.x = 0;
          this.body.body.velocity.y = 0;

          this.props.gameState.updateState!({
            gameOver: false,
            paused: false,
            score: 0,
            scrollSpeed: -5,
            x: 0,
          });

          this.context.loop.start();
        }, 1000);
      }

      setTimeout(() => {
        AudioManager.playSound('hit');
      }, 1000);
    }
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


export default Bird;