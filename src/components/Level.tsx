import * as PropTypes from 'prop-types';
import * as React from 'react';

import { GameLoopSubscription } from 'src/core/game-loop/GameLoopSubscription';
import { IGameStateState } from './GameState/GameState';
import TileMap from './TileMap';

export interface ILevelState {
    stageX: number;
}

export interface ILevelProps {
    gameState: IGameStateState;
}

export interface ILevelContext {
    scale: number;
    loop: object;
}

let lastLoop = 0;

export default class Level extends React.Component<ILevelProps, ILevelState> {


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
                if(null != this.props.gameState && null != this.props.gameState.updateState && null != this.props.gameState.x) {
                    this.props.gameState.updateState({x: this.props.gameState.x - 10});
                }

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
            transform: `translate(${this.props.gameState.x}px, 0px) translateZ(0)`,
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