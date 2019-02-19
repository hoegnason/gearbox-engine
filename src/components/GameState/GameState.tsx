import * as React from 'react';


import Bird from '../bird/Bird';
import Body from '../body/Body';
import Level from '../Level';
import Pipe from '../pipe/Pipe';

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

    // MovePipes: flutt Pipe og Body component frá App og inn her
    public render(){

        return <div><Bird gameState={this.state} /><Level gameState={this.state }/><Pipe x={900} />
        <Body dynamic={false} x={0} y={(576 - 64)} width={1024} height={64} velocity={{ x: 0, y: 0 }} colided={false} /></div>
    }

}

export default GameState;