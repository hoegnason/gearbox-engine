import * as React from 'react';


import Bird from '../bird/Bird';
import Body from '../body/Body';
import { FlappyUI } from '../flappy-ui/FlappyUI';
import Level from '../Level';
import Pipe from '../pipe/Pipe';

export interface IGameStateState {
    scrollSpeed?: number;
    gameOver?: boolean;
    updateState?: (gameState: IGameStateState) => void;
    x?: number;
    paused?: boolean;
    score?: number;
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
            score: 0,
            scrollSpeed: -5,
            updateState: updater,
            x: 0
        }

    }

    public updateState(state: IGameStateState) {
        this.setState(state);
    }

    // MovePipes: flutt Pipe og Body component frá App og inn her
    public render() {

        const pipeOffset = 900 + ((this.state.x) ? this.state.x : 0);
        // const speed = (this.state.scrollSpeed) ? this.state.scrollSpeed : 0;

        const pipe1 = pipeOffset;
        const pipe2 = pipeOffset + 120 + 900;
        const pipe3 = pipeOffset + 120 + 900 + 120 + 900;
        const pipe4 = pipeOffset + 120 + 900 + 120 + 900 + 120 + 900;

        return (
            <div>
                <FlappyUI gameState={this.state} />
                <Bird gameState={this.state} />
                <Level gameState={this.state} />
                {pipe1 > 0 && <Pipe x={pipe1} /> }
                {pipe2 > 0 && <Pipe x={pipe2} /> }
                {pipe3 > 0 && <Pipe x={pipe3} /> }
                {pipe4 > 0 && <Pipe x={pipe4} /> }
                <Body bodyName={'Ground'} dynamic={false} x={0} y={(576 - 64)} width={1024} height={64} velocity={{ x: 0, y: 0 }} colided={false} />
            </div>
        )
    }

}

export default GameState;