import * as PropTypes from 'prop-types';
import * as React from 'react';
import { IBoxGameStateState } from '../BoxGameState/BoxGameState';

import { ScaledText } from '../../../../components/ScaledText/ScaledText';
import { gameState } from '../BoxGameState/DefaultProps';


interface IBoxUIProps {
    gameState: IBoxGameStateState;
}

export class BoxUI extends React.Component<IBoxUIProps, {}> {

    public static contextTypes = {
        height: PropTypes.number,
        loop: PropTypes.object,
        scale: PropTypes.number,
        width: PropTypes.number
    }

    public static defaultProps: IBoxUIProps = { gameState }

    private oldProps: IBoxGameStateState = {};
    private renderedScale: 0;

    public shouldComponentUpdate(nextProps: IBoxUIProps, nextState: {}) {

        if (this.renderedScale !== this.context.scale) {
            return true;
        }

        if ((this.oldProps.gameOver !== nextProps.gameState.gameOver) || (this.oldProps.paused !== nextProps.gameState.paused) || (this.oldProps.score !== nextProps.gameState.score)) {

            this.oldProps = nextProps.gameState;

            return true;
        }

        return false;
    }

    public render() {

        return (
            <div style={this.getWrappedStyle()}>
                {this.props.gameState.gameOver && this.getGameOverElement()}
                {this.getScoreElement()}
            </div>);
    }

    private getScoreElement(): React.ReactElement {
        return (
            <ScaledText style={{ ...this.getTextStyle(), fontSize: '40px', position: 'absolute', left: '50%', top: '7%', transform: 'translate(-50%, -50%)' }}>
                {this.props.gameState.score && this.props.gameState.score}
            </ScaledText>
        );
    }

    private getGameOverElement(): React.ReactElement {
        return (<ScaledText style={{ ...this.getTextStyle(), position: 'absolute', transform: `translate(0px, ${this.context.scale * 75}px)`, height: '100%', width: '100%' }}>Game Over!</ScaledText>);
    }

    private getTextStyle(): React.CSSProperties {
        return {
            WebkitTextFillColor: 'white',
            WebkitTextStrokeColor: 'black',
            WebkitTextStrokeWidth: '2px',
            fontFamily: "'Luckiest Guy', cursive"
        };
    }

    private getWrappedStyle(): React.CSSProperties {
        return {
            height: '100%',
            position: 'absolute',
            transform: '0px, 0px',
            width: '100%',
            zIndex: 99999999
        };
    }
}