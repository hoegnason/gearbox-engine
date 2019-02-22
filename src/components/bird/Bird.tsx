import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Subscription } from 'rxjs';

import { createKeyboardObservable } from '../../core/hid/keyboardSubject';

import { AudioManager } from '../../core/sound/AudioManager';

import GameLoop from 'src/core/game-loop/GameLoop';
import Body from '../body/Body';


import { IGameStateState } from '../GameState/GameState';

import { IBody } from 'src/core/physics/physics-engine';

let that: Bird;

let isPaused = false;
let isGameOver = false;
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

  public body: any;

  private keyboardSubscription: Subscription;

  private colided = false;

  constructor(props: any) {
    super(props);
  }


  public componentDidMount() {

    AudioManager.loadSoundFile('wing', "assets/sound/sfx_wing.wav", false);
    AudioManager.loadSoundFile('hit', "assets/sound/sfx_hit.wav", false);
    AudioManager.loadSoundFile('die', "assets/sound/sfx_die.wav", false);
    AudioManager.loadSoundFile('point', "assets/sound/sfx_point.wav", false);

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

      /*
      if ('1' === key) {
        if (null != this.props.gameState && null != this.props.gameState.updateState && null != this.props.gameState.scrollSpeed) {
          this.props.gameState.updateState({scrollSpeed: this.props.gameState.scrollSpeed + 10});

          // tslint:disable-next-line:no-console
          console.log('scrollSpeed: ', this.props.gameState.scrollSpeed);
        }
      }

      if ('2' === key) {
        if (null != this.props.gameState && null != this.props.gameState.updateState && null != this.props.gameState.scrollSpeed) {
          this.props.gameState.updateState({scrollSpeed: this.props.gameState.scrollSpeed - 10});
        }
      }
      
      // tslint:disable-next-line:no-console
      console.log('pressed key: ', key);
      */

    });

    that = this;
  }

  public componentWillUnmount() {

    if (null != this.keyboardSubscription) {
      this.keyboardSubscription.unsubscribe();
    }
  }

  public render() {

    if (this.props.gameState.debug && null != this.body && null != this.body.body && null != this.body.body.y) {
      this.body.body.y = ((window as any).autoPilotY) || 288;

      this.body.body.velocity.x = 0;
      this.body.body.velocity.y = 0;
    }

    const xOffset = Math.floor(((this.context.width / this.context.scale) * 0.2));

    return (
      <div>
        {/* <Body bodyName={'Bird'} ref={b => { this.body = b; }} onUpdate={this.doUpdate} onCollision={this.onCollision} dynamic={true} x={1} y={1} width={25} height={25} velocity={{ x: 5, y: 0 }} colided={false} /> */}
        <Body bodyName={'Bird'} ref={b => { this.body = b; }} onUpdate={this.doUpdate} onCollision={this.onCollision} dynamic={true} x={xOffset} y={1} width={25} height={25} velocity={{ x: 0, y: 0 }} colided={false} />
        <div style={{ ...this.getStyles(), backgroundColor: 'red', width: 25 * this.context.scale, height: 25 * this.context.scale }} />
      </div>
    );
  }

  private jump() {

    if (null != this.body && null != this.body.body) {

      if (!isGameOver) {
        this.body.body.velocity.y = -15;
        AudioManager.playSound('wing');
        this.context.Log("Jump!!");
      }
    }
  }

  /*
  private setGameOver(gameOver: boolean) {

    if (null != this.context && null != this.context.loop) {

      const loop = this.context.loop as GameLoop;

      loop.stop();


      if (!isPaused && !isGameOver && gameOver) {

        this.context.Log(`STOP! isGameOver: ${gameOver}!`);
        loop.stop();
      }

      isGameOver = gameOver;
      this.context.Log(`isGameOver: ${gameOver}!`);
    }
  }
  */

  private showPausedUI(show: boolean) {
    if (null != that.props.gameState && null != that.props.gameState.updateState) {
      that.props.gameState.updateState({ paused: show });
    }
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

      if (!isGameOver) {

        if (isPaused) {

          loop.start();
          isPaused = false;
          this.showPausedUI(false);
        } else {

          loop.stop();
          isPaused = true;
          this.showPausedUI(true);
        }
      }
    }
  }

  private doUpdate(): void {

    if (that.props.gameState.debug && null != that.body && null != that.body.body && null != that.context.height && null != that.context.scale) {

      that.body.body.y = that.body.body.y = ((window as any).autoPilotY);
    }

    /*
    if (null != that.forceUpdate) {
      that.forceUpdate();
    }
    */
  }

  private onCollision(bodyColidedWith: IBody): void {

    if ('ScoreColider' === bodyColidedWith.bodyName && scoreColiderID !== bodyColidedWith.bodyID) {
      scoreColiderID = bodyColidedWith.bodyID || 0;

      if (null != that.props.gameState && null != that.props.gameState.updateState && null != that.props.gameState.score && null != that.props.gameState.scrollSpeed) {

        const newScrollSpeed = that.props.gameState.scrollSpeed + (-1 * that.props.gameState.score);

        that.props.gameState.updateState({ score: that.props.gameState.score + 1, scrollSpeed: newScrollSpeed });

        that.context.Log(`gameState.score: ${that.props.gameState.score}`);

        // that.body.body.velocity.x = (-1 * newScrollSpeed);

        AudioManager.playSound('point');
      }
    }

    if ('Ground' === bodyColidedWith.bodyName || 'Pipe' === bodyColidedWith.bodyName) {

      if (!that.colided) {

        that.context.Log(`Bird colided with: ${bodyColidedWith.bodyName}!`);

        AudioManager.playSound('hit');

        isGameOver = true;
        that.context.loop.stop();

        if (null != that.props.gameState && null != that.props.gameState.updateState) {
          that.props.gameState.updateState({ gameOver: true });
        }

        that.context.Log(`isGameOver: ${isGameOver}!`);

        setTimeout(() => {
          AudioManager.playSound('die');
        }, 1000);

      }
    }
  }
  private getStyles(): React.CSSProperties {

    // if (null != this.body && null != this.body.body) {
    if (null != this.body && null != this.body.body) {
      if (null != this.props.gameState && null != this.props.gameState.x) {
        return {
          position: 'absolute',
          transform: `translate(${this.body.body.x * this.context.scale}px, ${this.body.body.y * this.context.scale}px)`,
          // transform: `translate(${50 * this.context.scale}px, ${50 * this.context.scale}px)`,
          transformOrigin: 'left top',
        };
      }
    }

    return {};
  }
}


export default Bird;
