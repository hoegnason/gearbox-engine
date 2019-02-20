import * as PropTypes from 'prop-types';
import * as React from 'react';

interface IGameStateState {
    gameOver: boolean;
    x: number;
    y: number;
}

interface IGameStateProps {
    children?: any;
}

export class GameState extends React.Component<IGameStateProps, IGameStateState> {

    public static childContextTypes = {
        updateState: PropTypes.func
    };

    constructor(props: any) {
        super(props);
        this.state = {
            gameOver: false,
            x: 0,
            y: 0
        }

    }

    public getChildContext() {
        return {
            updateState: this.updateState
        };
    }

    public updateState(GameOver: boolean, newX: number, newY: number){
        this.setState({
            gameOver: GameOver,
            x: newX,
            y: newY
        });
    }

    public render(){
        return <div>{this.updateState}</div>
    }

}

export default GameState;