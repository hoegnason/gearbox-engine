import * as PropTypes from 'prop-types';
import * as React from 'react';

import TileMap from './TileMap';

// import { Subscription, timer } from 'rxjs';

// import GameStore from './stores/game-store';

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
    private loopID: number;

    // private cameraObs: Subscription;

    // private cameraWatcher: any

    constructor(props: any) {
        super(props);

        this.stageX = 0;

        this.state = {
            stageX: 0,
        };

        /*
        setInterval(() => {
            if (null != this.stageX) {
                birdstate.set(birdstate.get() - 5); 
                const offset = birdstate.get();
                
                this.setState({stageX: offset});
            }
        }, 1000/60);
        */
    }

    public componentDidMount() {

        this.loopID = this.context.loop.subscribe(() => {

            if (null != this.stageX) {
                // console.log("looping !: stageX"); // tslint:disable-line    
            }
            

            // 60 frames per sec!
            const currTime = 1 * Date.now();

            if ((lastLoop + 1000/60) < currTime) {
                birdstate.set(birdstate.get() - 10);
                const offset = birdstate.get();
                
                this.setState({stageX: offset});
                lastLoop = currTime;
            }
            // console.log("looping !"); // tslint:disable-line
        });

        /*
        this.cameraObs = timer(0, 1000/60).subscribe((t: number) => {

            if (null != this.stageX) {
                birdstate.set(birdstate.get() - 5); 
                const offset = birdstate.get();
                
                this.setState({stageX: offset});
            }
        });
        */
        
        /*
        this.cameraWatcher = autorun(() => {
            const targetX = Math.round(GameStore.stageX * this.context.scale);
            this.setState({
                stageX: targetX,
            });
        });
        */
    }

    /*
    public componentWillReceiveProps(nextProps: any, nextContext: ILevelContext) {
        const targetX = Math.round(GameStore.stageX * nextContext.scale);
        this.setState({
            stageX: targetX,
        });
    }

    /*
    public componentWillUnmount() {
        this.cameraWatcher();
    }
    */

   public componentWillUnmount() {
        // this.cameraObs.unsubscribe();
        this.context.loop.unsubscribe(this.loopID);
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

        const boardwalktileStyle: React.CSSProperties = { top: Math.floor(64 * this.context.scale) };
        // const buildingsStyle: React.CSSProperties = { top: Math.floor(-63 * this.context.scale) };

        return (
            <div style={this.getWrapperStyles()}>
                { /*
                <TileMap
                    style={boardwalktileStyle}
                    src="assets/boardwalktile.png"
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
                /> */}
                <TileMap
                    style={boardwalktileStyle}
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
                { /* 
                <TileMap
                    style={buildingsStyle}
                    src="assets/buildings.png"
                    rows={1}
                    columns={6}
                    tileSize={512}
                    layers={[[1, 2, 3, 4, 5, 6]]}
                />
                */ }
            </div>
        );
    }
}