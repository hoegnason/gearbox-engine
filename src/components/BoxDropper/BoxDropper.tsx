import * as PropTypes from 'prop-types';
import * as React from 'react';

import {Box} from '../box/Box';
import { IBoxGameStateState } from '../BoxGameState/BoxGameState';

interface IBoxDropperProps {
    gameState: IBoxGameStateState;
}

export class BoxDropper extends React.Component<IBoxDropperProps, {}> {

    public static contextTypes = {
        scale: PropTypes.number,
        width: PropTypes.number
    };

    private staticBoxes: number[] = [];

    constructor(props: any) {
        super(props);

        this.addBox = this.addBox.bind(this);
        // this.staticBoxes = this.generateBoxes();
    }


    // MovePipes: flutt Pipe og Body component frá App og inn her
    public render() {

        return (
            <div>
                {this.staticBoxes.map((box: number, index: number) => <Box key={index} gameState={this.props.gameState} y={box} enabled={false} />)}
                <Box addBox={this.addBox}/>
            </div>
        )
    }

    public addBox(y: number) {
        this.staticBoxes.push(y);
    }

}

export default BoxDropper;