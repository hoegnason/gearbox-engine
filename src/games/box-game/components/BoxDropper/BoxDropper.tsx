import * as PropTypes from 'prop-types';
import * as React from 'react';

import {Box} from '../box/Box';
import { IBoxGameStateState } from '../BoxGameState/BoxGameState';

import {gameState} from '../BoxGameState/DefaultProps'

interface IBoxDropperProps {
    gameState: IBoxGameStateState;
}

export class BoxDropper extends React.Component<IBoxDropperProps, {}> {

    public static contextTypes = {
        loop: PropTypes.object,
        scale: PropTypes.number,
        width: PropTypes.number
    };

    public static defaultProps: IBoxDropperProps = { gameState }

    private staticBoxes: number[] = [];

    constructor(props: any) {
        super(props);

        this.addBox = this.addBox.bind(this);
    }

    public componentDidMount(){
        this.props.gameState.score! += 1;
    }

    public componentWillReceiveProps(nextProps: IBoxDropperProps){

        // Clear boxes to make ready for new game
        if (nextProps.gameState.gameOver === true){
            this.context.loop.stop();
            this.staticBoxes = [];
        }
    }


    public render() {

        return (
            <div>
                {this.staticBoxes.map((box: number, index: number) => <Box key={index} gameState={this.props.gameState} y={box} enabled={false} />)}
                <Box key={1} gameState={this.props.gameState} addBox={this.addBox}/>
            </div>
        )
    }

    public addBox(y: number) {
        this.staticBoxes.push(y);
    }

}

export default BoxDropper;