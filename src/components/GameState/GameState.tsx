import * as PropTypes from 'prop-types';
import * as React from 'react';


import Bird from '../bird/Bird';
import Body from '../body/Body';
import { FlappyUI } from '../flappy-ui/FlappyUI';
import Level from '../Level';
import PipeGenerator from '../PipeGenerator/PipeGenerator';

export interface IGameStateState {
    scrollSpeed?: number;
    gameOver?: boolean;
    updateState?: (gameState: IGameStateState) => void;
    x?: number;
    paused?: boolean;
    score?: number;
    debug?: boolean;
}

interface IGameStateProps {
    children?: any;
}

export class GameState extends React.Component<IGameStateProps, IGameStateState> {

    public static contextTypes = {
        scale: PropTypes.number,
        width: PropTypes.number
    };

    private childrenLenght = 0;

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

    // This should completly ignore ConsoleState
    public shouldComponentUpdate(nextProps: IGameStateProps, nextState: IGameStateState): boolean {

        if ((null == nextProps) || (null == nextProps.children)) {
            
            return true;
        }

        if (null != nextProps && null != nextProps.children && nextProps.children.length !== this.childrenLenght) {
            
            return true;
        }

        return false;
    }

    public updateState(state: IGameStateState) {
        this.setState(state);
    }

    // MovePipes: flutt Pipe og Body component frá App og inn her
    public render() {

        return (
            <div>
                <FlappyUI gameState={this.state} />
                <Bird gameState={this.state} />
                <Level gameState={this.state} />

                <PipeGenerator gameState={this.state} />>

                <Body bodyName={'Ground'} dynamic={false} x={0} y={(576 - 64)} width={1024} height={64} velocity={{ x: 0, y: 0 }} colided={false} />
            </div>
        )
    }
}

export default GameState;