import * as PropTypes from 'prop-types';
import * as React from 'react';
import Body from '../body/Body';
import Sprite from '../sprite/Sprite';

import pipeSprite from '../../assets/sprites/BirdHero.png';

export interface IPipeProps {
    x: number;
    y: number;
}

// 576

/*
const minY = 100;
const maxY = (576 - 100);
*/

const max = 576;
const scoreZone = 176;

class Pipe extends React.Component<IPipeProps, {}> {

    public static contextTypes = {
        loop: PropTypes.object,
        scale: PropTypes.number,
        width: PropTypes.number
    }

    private x = 0;
    private y = 0;

    public shouldComponentUpdate(props: IPipeProps, prevState: {}) {

        if ((props.x !== this.x) || (props.y !== this.y)) {
            this.x = props.x;
            this.y = props.y;

            return true;
        }

        return false;
    }

    public render() {

        const yTop = (max - scoreZone) * this.props.y;
        // const yButtom = (max - scoreZone) * (1 - this.props.y);

        const pipeTopY = 0;
        const pipeTopHeight = yTop;

        // const pipeButtomY = 400;
        const pipeWidth = 90

        // const scoreColiderY = ((pipeTopY + pipeButtomY) / 2);

        const scoreColiderY = (pipeTopY + pipeTopHeight);

        const pipeButtomY = (scoreColiderY + scoreZone);

        const pipeButtomHeight = (max - pipeButtomY);

        return (
            <div>
                <Body bodyName={'Pipe'} x={this.props.x} y={pipeTopY} width={pipeWidth} height={pipeTopHeight} dynamic={false} velocity={{ x: 0, y: 0 }} colided={false} />
                
                <div style={{ transform: `translate(0px, ${((-1 * (1024 - pipeTopHeight)) * this.context.scale )}px)` }}>
                {/* './assets/sprites/CroppedColumnReversed.png' */}
                    <Sprite x={this.props.x} y={pipeTopY} width={100} height={1024} src={'assets/sprites/CroppedColumnReversed.png'} />
                </div>

                <img src={pipeSprite} />

                <Body bodyName={'Pipe'} x={this.props.x} y={pipeButtomY} width={pipeWidth} height={pipeButtomHeight} dynamic={false} velocity={{ x: 0, y: 0 }} colided={false} />
                <div>
                    <Sprite x={this.props.x} y={pipeButtomY} width={100} height={1024} src={'assets/sprites/CroppedColumn.png'} />
                </div>

                <Body bodyName={'ScoreColider'} x={this.props.x + pipeWidth} y={scoreColiderY} width={pipeWidth} height={200} dynamic={false} velocity={{ x: 0, y: 0 }} colided={false} />
            </div>
        );
    }
}

export default Pipe;
