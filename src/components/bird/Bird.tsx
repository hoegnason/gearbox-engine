import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Subscription } from 'rxjs';

import { createKeyboardObservable } from '../../core/hid/keyboardSubject';

import GameLoop from 'src/core/game-loop/GameLoop';
import Body from '../body/Body';


let that: Bird;

let isPaused = false;
let isGameOver = false;

export class Bird extends React.Component {

  public static displayName = 'Bird';

  public static contextTypes = {
    Log: PropTypes.func,
    engine: PropTypes.object,
    loop: PropTypes.object,
    scale: PropTypes.number
  };

  public body: any;

  private keyboardSubscription: Subscription;

  constructor(props: any) {
    super(props);
  }


  public componentDidMount() {

    this.setGameOver(false);

    this.keyboardSubscription = createKeyboardObservable({ touchKey: ' ' }).subscribe((key: string) => {

      if (' ' === key) {
        this.jump();
      }

      if ('Esc' === key || 'Escape' === key) {
        this.togglePause();
      }
    });

    that = this;
  }

  public componentWillUnmount() {

    if (null != this.keyboardSubscription) {
      this.keyboardSubscription.unsubscribe();
    }
  }

  public render() {

    return (
      <div>
        <Body ref={b => { this.body = b; }} onUpdate={this.doUpdate} dynamic={true} x={1} y={1} width={25} height={25} velocity={{ x: 5, y: 0 }} colided={false} />
        <div style={{ ...this.getStyles(), backgroundColor: 'red', width: 25 * this.context.scale, height: 25 * this.context.scale }} />
      </div>
    );
  }

  private jump() {

    if (null != this.body && null != this.body.body) {

      this.body.body.velocity.y = -15;
      this.context.Log("Jump!!");
    }
  }

  private setGameOver(gameOver: boolean) {

    const loop = this.context.loop as GameLoop;

    isGameOver = gameOver;
    
    if(gameOver) {

      loop.stop();
    } else {

      loop.start();
    }

    this.context.Log(`isGameOver: ${gameOver}!`);
  }

  private togglePause() {

    if (null != this.context && null != this.context.loop) {

      const loop = this.context.loop as GameLoop;

      if (!isGameOver) {
       
        if (isPaused) {
        
          loop.start();
          isPaused = false
        } else {
  
          loop.stop();
          isPaused = true
        }
      }
    }
  }

  private doUpdate(): void {

    if (null != that.forceUpdate) {
      that.forceUpdate();
    }
  }

  private getStyles(): React.CSSProperties {

    if (null != this.body && null != this.body.body) {
      return {
        position: 'absolute',
        transform: `translate(${this.body.body.x * this.context.scale}px, ${this.body.body.y * this.context.scale}px)`,
        transformOrigin: 'left top',
      };
    }

    return {};
  }
}

export default Bird;