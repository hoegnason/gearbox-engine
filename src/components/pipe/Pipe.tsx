import * as PropTypes from 'prop-types';
import * as React from 'react';
import Body from '../body/Body';

export interface IPipeProps {
    x: number;
}

class Pipe extends React.Component<IPipeProps, {}> {

    public static contextTypes = {
        loop: PropTypes.object,
        scale: PropTypes.number
    }

    public render() {

        const pipeTopY = 0;
        const pipeButtomY = 400;

        // MovePipes: Sett velocity til x: -5 fyri at senda pipes aftureftir
        return (
            <div>
                <Body x={this.props.x} y={pipeTopY} width={120} height={200} dynamic={false} velocity={{ x: -5, y: 0 }} colided={false} />
                <div style={this.getPipeStyles(this.props.x, pipeTopY)} />

                <Body x={this.props.x} y={pipeButtomY} width={120} height={200} dynamic={false} velocity={{ x: -5, y: 0 }} colided={false} />
                <div style={this.getPipeStyles(this.props.x, pipeButtomY)} />
            </div>
        );
    }

    private getPipeStyles(x: number, y: number): React.CSSProperties {

        return {
            backgroundColor: 'green',
            height: 200 * this.context.scale,
            overflow: 'hidden',
            position: 'absolute',
            transform: `translate(${x * this.context.scale}px, ${y * this.context.scale}px)`,
            transformOrigin: 'left top',
            width: 120 * this.context.scale
        };
    }
}

export default Pipe;
