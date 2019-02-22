import * as PropTypes from 'prop-types';
import * as React from 'react';


import Bird from '../bird/Bird';
import Body from '../body/Body';
import { FlappyUI } from '../flappy-ui/FlappyUI';
import Level from '../Level';
import Pipe, { IPipeProps } from '../pipe/Pipe';

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

const pipeOffsetX = 900;

export class GameState extends React.Component<IGameStateProps, IGameStateState> {

    public static contextTypes = {
        scale: PropTypes.number,
        width: PropTypes.number
      };


      private pipes: IPipeProps[] = [];

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

        this.pipes = this.generatePipes();
    }

    public updateState(state: IGameStateState) {
        this.setState(state);
    }

    // MovePipes: flutt Pipe og Body component frá App og inn her
    public render() {

        const pipeOffset = pipeOffsetX + ((this.state.x) ? this.state.x : 0);
        // const speed = (this.state.scrollSpeed) ? this.state.scrollSpeed : 0;

        /*
        const pipe1 = pipeOffset;
        const pipe2 = pipeOffset + 120 + pipeOffsetX;
        const pipe3 = pipeOffset + 120 + pipeOffsetX + 120 + pipeOffsetX;
        const pipe4 = pipeOffset + 120 + pipeOffsetX + 120 + pipeOffsetX + 120 + pipeOffsetX;
        */

        return (
            <div>
                <FlappyUI gameState={this.state} />
                <Bird gameState={this.state} />
                <Level gameState={this.state} />
                
                {this.state.x && this.pipes.map((pipe: IPipeProps) => this.inViewOfCamera(-pipeOffsetX + pipeOffset + pipe.x) && <Pipe x={-pipeOffsetX + pipeOffset + pipe.x} />)}

                <Body bodyName={'Ground'} dynamic={false} x={0} y={(576 - 64)} width={1024} height={64} velocity={{ x: 0, y: 0 }} colided={false} />
            </div>
        )
    }


    private generatePipes(): IPipeProps[]  {
        
        const pipes: IPipeProps[] = [];
        
        pipes.push({x: pipeOffsetX});

        for (let i = 2; i < 10; i++) {

            pipes.push({x: ((pipeOffsetX + 120) * i)});
        }

        return pipes;
    }

    private inViewOfCamera(x: number) {
        return (x > 0 && x < (this.context.width / this.context.scale));
    }

}

export default GameState;