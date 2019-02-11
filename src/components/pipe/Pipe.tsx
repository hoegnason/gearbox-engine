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

        return (
            <div>
                <Body x={this.props.x} y={pipeTopY} width={120} height={400} dynamic={false} velocity={{ x: 0, y: 0 }} colided={false} />
                <div style={this.getPipeStyles(this.props.x, pipeTopY)} />

                <Body x={this.props.x} y={pipeButtomY} width={120} height={400} dynamic={false} velocity={{ x: 0, y: 0 }} colided={false} />
                <div style={this.getPipeStyles(this.props.x, pipeButtomY)} />
            </div>
        );
    }

    private getPipeStyles(x: number, y: number): React.CSSProperties {

        return {
            backgroundColor: 'green',
            height: '400px',
            overflow: 'hidden',
            position: 'absolute',
            transform: `translate(${x * this.context.scale}px, ${y * this.context.scale}px)`,
            transformOrigin: 'left top',
            width: '120px'
        };
    }
}

export default Pipe;
