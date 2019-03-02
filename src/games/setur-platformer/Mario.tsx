import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Subscription } from 'rxjs';

import { createKeyboardObservable } from '../../core/hid/keyboardSubject';

import Body from '../../components/body/Body';


import { IGameStateState } from '../../components/GameState/GameState';

import { gameState } from '../../components/GameState/DefaultProps';
import Sprite from '../../components/sprite/Sprite';

import BirdHero from '../../assets/sprites/BirdHero.png';

import BirdHeroOpts from '../../assets/sprites/BirdHero.json';


import { IBody } from 'src/core/physics/physics-engine';

let lastCollision = 0;

interface IMarioProps {
    gameState: IGameStateState;
}

export class Mario extends React.Component<IMarioProps, {}> {

    public static displayName = 'Mario';

    public static contextTypes = {
        Log: PropTypes.func,
        engine: PropTypes.object,
        height: PropTypes.number,
        loop: PropTypes.object,
        scale: PropTypes.number,
        width: PropTypes.number
    };

    public static defaultProps: IMarioProps = { gameState }

    public body: any;

    private colided = false;
    private keyboardSubscription: Subscription;
    private isJumping = false;

    private oldX = 0;
    private oldY = 0;

    constructor(props: any) {
        super(props);

        if (this.colided) {
            /* */
        }

        this.body = {
            body: {
                bodyID: 1,
                bodyName: 'Mario',
                colided: false,
                dynamic: false,
                height: 0,
                velocity: { x: 0, y: 0 },
                width: 0,
                x: 0,
                y: 0
            }
        };

        this.doUpdate = this.doUpdate.bind(this);
        this.onCollision = this.onCollision.bind(this);
    }

    public componentDidMount() {
        this.keyboardSubscription = createKeyboardObservable({ touchKey: ' ' }).subscribe((key: string) => {

            if (' ' === key) {
                this.jump();
            }

            if ('ArrowLeft' === key) {
                this.move(false);
            }

            if ('ArrowRight' === key) {
                this.move(true);
            }

            /*
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
            */

        });
    }

    public componentWillUnmount() {
        this.keyboardSubscription.unsubscribe();
    }

    public shouldComponentUpdate(nextProps: IMarioProps, nextState: {}) {
        
        if ((Math.floor(this.body.body.x) === this.oldX) && (Math.floor(this.body.body.y) === this.oldY)) {
            return false;
        }

        return true;
    }

    public render() {
        this.oldX = Math.floor(this.body.body.x);
        this.oldY = Math.floor(this.body.body.y);

        return (
            <div>
                <Body bodyName={'Mario'} ref={b => { this.body = b; }} onCollision={this.onCollision} onUpdate={this.doUpdate} dynamic={true} trigger={false} x={250} y={0} width={113} height={67} velocity={{ x: 0, y: 0 }} colided={false} prevX={250} prevY={0} />
                <Sprite x={Math.floor(this.body.body.x)} y={Math.floor(this.body.body.y)} width={113} height={67} src={BirdHero} opts={BirdHeroOpts} steps={['BirdHero_1', 'BirdHero_0']} ticksPerFrame={15} animate={false} />
            </div>
        );
    }

    private jump() {

        if (!this.isJumping && !this.props.gameState.gameOver) {
            this.isJumping = true;
            this.body.body.velocity.y = -15;
            this.context.Log("Jump!!");
        }
    }

    private move(right: boolean) {

        if (right) {
            if (this.body.body.velocity.x <= 10) {
                this.body.body.velocity.x = 10;
            }
        }
        
        if (!right) {
            if (this.body.body.velocity.x >= -10) {
                this.body.body.velocity.x = -10;
            }
        }
    }

    private doUpdate() {
        this.props.gameState.updateState!({ x: this.body.body.x });
    }

    private onCollision(colidedWith: IBody) {
        if (null != colidedWith.bodyID && colidedWith.bodyID !== lastCollision) {
            this.isJumping = false;
            lastCollision = colidedWith.bodyID;
        }
    }
}


export default Mario;
