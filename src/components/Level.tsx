import * as PropTypes from 'prop-types';
import * as React from 'react';

import { GameLoopSubscription } from 'src/core/game-loop/GameLoopSubscription';
import TileMap from './TileMap';

export interface ILevelState {
    stageX: number;
}

export interface ILevelContext {
    scale: number;
    loop: object;
}

export class BirdState {
    private static xOffset: number = 0;

    public get(): number {
        return BirdState.xOffset;
    }

    public set(x: number) {
        BirdState.xOffset = x;
    }
};

const birdstate = new BirdState();

let lastLoop = 0;

export default class Level extends React.Component<{}, ILevelState> {


    public static contextTypes = {
        loop: PropTypes.object,
        scale: PropTypes.number
    };

    private stageX: number;
    private gameLoopSubscription: GameLoopSubscription;

    constructor(props: any) {
        super(props);

        this.stageX = 0;

        this.state = {
            stageX: 0,
        };
    }

    public componentDidMount() {

        this.gameLoopSubscription = this.context.loop.subscribe(() => {

            if (null != this.stageX) {
                // this.context.Log("looping !: stageX");
                // console.log("looping !: stageX"); // tslint:disable-line    
            }


            // 60 frames per sec!
            const currTime = 1 * Date.now();

            if ((lastLoop + 1000 / 60) < currTime) {
                birdstate.set(birdstate.get() - 10);
                const offset = birdstate.get();

                this.setState({ stageX: offset });
                lastLoop = currTime;
            }
        });
    }

    public componentWillUnmount() {
        this.gameLoopSubscription.unsubscribe();
    }

    public getWrapperStyles(): React.CSSProperties {
        return {
            position: 'absolute',
            transform: `translate(${this.state.stageX}px, 0px) translateZ(0)`,
            transformOrigin: 'top left',
        };
    }

    public render() {

        // tslint:disable-next-line

        const grassTileStyle: React.CSSProperties = { top: Math.floor(64 * this.context.scale) };

        return (
            <div style={this.getWrapperStyles()}>
                <TileMap
                    style={grassTileStyle}
                    src="assets/grass.png"
                    tileSize={128}
                    columns={24}
                    rows={4}
                    layers={[
                        [
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                        ],
                    ]}
                />
            </div>
        );
    }
}