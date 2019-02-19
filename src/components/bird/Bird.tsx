import * as PropTypes from "prop-types";
import * as React from "react";

import { GameLoopSubscription } from "src/core/game-loop/GameLoopSubscription";
import { AudioManager } from "../../core/sound/AudioManager";
import Body from "../body/Body";

import { IGameStateState } from '../GameState/GameState';

let that: Bird;

interface IBirdProps {
    gameState: IGameStateState;
}

export class Bird extends React.Component<IBirdProps, {}> {
    public static displayName = "Bird";

    public static contextTypes = {
        Log: PropTypes.func,
        engine: PropTypes.object,
        loop: PropTypes.object,
        scale: PropTypes.number
    };

    public body: any;
    private colided = false;

    private subscription: GameLoopSubscription;

    constructor(props: any) {
        super(props);
    }

    public componentDidMount() {
        const SPACE = 32;
        AudioManager.loadSoundFile('wing', "assets/sound/sfx_wing.wav", false);
        AudioManager.loadSoundFile('hit', "assets/sound/sfx_hit.wav", false);
        AudioManager.loadSoundFile('die', "assets/sound/sfx_die.wav", false);

        const doc = document.querySelector("body");

        if (null != doc) {
            const processKey = (event: any) => {
                if (SPACE === event.which) {
                    if (null != this.body && null != this.body.body) {
                        this.body.body.velocity.y = -15;
                        this.context.Log("Jump!!");
                        AudioManager.playSound("wing");
                    }
                }
            };

            doc.addEventListener("keydown", processKey);
        }

        that = this;
    }

    public componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    public render() {
        return (
            <div>
                <Body
                    ref={b => {
                        this.body = b;
                    }}
                    onUpdate={this.doUpdate}
                    onCollision={this.onCollision}
                    dynamic={true}
                    x={1}
                    y={1}
                    width={25}
                    height={25}
                    velocity={{ x: 5, y: 0 }}
                    colided={false}
                />
                <div
                    style={{
                        ...this.getStyles(),
                        backgroundColor: "red",
                        height: 25 * this.context.scale,
                        width: 25 * this.context.scale
                    }}
                />
            </div>
        );
    }

    private doUpdate(): void {
        if (null != that.forceUpdate) {
            that.forceUpdate();
        }
    }

    private onCollision(): void {
        if (!that.colided) {
            AudioManager.playSound('hit');

            setTimeout(() => {
                AudioManager.playSound('die');
            }, 1000);

            that.colided = true;
        }
    }
    private getStyles(): React.CSSProperties {

        // if (null != this.body && null != this.body.body) {
        if (null != this.body && null != this.body.body) {
            if (null != this.props.gameState && null != this.props.gameState.x) {
                return {
                    position: 'absolute',
                    // transform: `translate(${this.body.body.x * this.context.scale}px, ${this.body.body.y * this.context.scale}px)`,
                    transform: `translate(${ 50 * this.context.scale}px, ${50 * this.context.scale}px)`,
                    transformOrigin: 'left top',
                };
            }
        }

        return {};
    }
}


export default Bird;
