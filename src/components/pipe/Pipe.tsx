import * as PropTypes from 'prop-types';
import * as React from 'react';
import Body from '../body/Body';

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

    private x: number;
    private y: number;

    public shouldComponentUpdate(props: IPipeProps, prevState: {}) {
        
        if (props.x !== this.x || props.y !== this.y) {
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
        const pipeWidth = 120

        // const scoreColiderY = ((pipeTopY + pipeButtomY) / 2);

        const scoreColiderY = (pipeTopY + pipeTopHeight);

        const pipeButtomY = (scoreColiderY + scoreZone);

        const pipeButtomHeight = (max - pipeButtomY);

        return (
            <div>
                <Body bodyName={'Pipe'} x={this.props.x} y={pipeTopY} width={pipeWidth} height={pipeTopHeight} dynamic={false} velocity={{ x: 0, y: 0 }} colided={false} />
                <div style={this.getPipeStyles(this.props.x, pipeTopY, pipeTopHeight)} />
                <Body bodyName={'Pipe'} x={this.props.x} y={pipeButtomY} width={pipeWidth} height={pipeButtomHeight} dynamic={false} velocity={{ x: 0, y: 0 }} colided={false} />
                <div style={this.getPipeStyles(this.props.x, pipeButtomY, pipeButtomHeight)} />
                <Body bodyName={'ScoreColider'} x={this.props.x + pipeWidth} y={scoreColiderY} width={pipeWidth} height={200} dynamic={false} velocity={{ x: 0, y: 0 }} colided={false} />
            </div>
        );
    }

    private getPipeStyles(x: number, y: number, height: number): React.CSSProperties {

        return {
            backgroundColor: 'green',
            height: height * this.context.scale,
            overflow: 'hidden',
            position: 'absolute',
            transform: `translate(${Math.floor((x * this.context.scale))}px, ${Math.floor((y * this.context.scale))}px)`,
            transformOrigin: 'left top',
            width: Math.floor((120 * this.context.scale))
        };
    }
}

export default Pipe;
