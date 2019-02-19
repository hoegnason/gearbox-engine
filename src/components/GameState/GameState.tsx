import * as React from 'react';

import Bird from '../bird/Bird';
import Level from '../Level';

export interface IGameStateState {
    scrollSpeed?: number;
    gameOver?: boolean;
    updateState?: (gameState: IGameStateState) => void;
    x?: number;
}

interface IGameStateProps {
    children?: any;
}

export class GameState extends React.Component<IGameStateProps, IGameStateState> {

    constructor(props: any) {
        super(props);

        const updater = this.updateState.bind(this);

        this.state = {
            gameOver: false,
            scrollSpeed: -5,
            updateState: updater,
            x: 0,
            
        }

    }

    public updateState(state: IGameStateState){
        this.setState(state);
    }

    public render(){

        return <div><Bird gameState={this.state} /><Level gameState={this.state }/></div>
    }

}

export default GameState;