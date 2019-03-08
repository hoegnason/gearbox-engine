import * as PropTypes from 'prop-types';
import * as React from 'react';
import { IBoxGameStateState } from '../BoxGameState/BoxGameState';

import { gameState } from '../BoxGameState/DefaultProps';
import { ScaledText } from '../ScaledText/ScaledText';

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
                {this.props.gameState.paused && this.getPauseElement()}
                {this.props.gameState.gameOver && this.getGameOverElement()}
                {this.getScoreElement()}
            </div>);
    }

    /*
    private getReadyElement(): React.ReactElement {
        return (
            <ScaledText style={{
                ...this.getTextStyle(),
                borderRadius: '25px', color: 'gold', fontSize: '24px', left: '20%', position: 'absolute', top: '20%', transform: 'translate(-50%, -50%)',
                // tslint:disable-next-line:object-literal-sort-keys
                WebkitTextStrokeColor: 'black',
                WebkitTextFillColor: 'gold',
                WebkitTextStrokeWidth: '2px '
            }}>Get Ready</ScaledText>)
    }*/

    /*
    private getDebugElement(): React.ReactElement {
        return (
            <ScaledText style={{
                ...this.getTextStyle(), backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: '25px', fontSize: '24px', left: '50%', padding: '20px', position: 'absolute', top: '20%', transform: 'translate(-50%, -50%)',
            }}>Debug Mode!<p
                style={{
                    color: 'gold',
                    fontSize: '18px',
                    // tslint:disable-next-line:object-literal-sort-keys
                    WebkitTextFillColor: 'gold',
                    WebkitTextStrokeColor: 'black',
                    WebkitTextStrokeWidth: '2px '
                }}>Auto Pilot Activated!</p></ScaledText>)
    }*/

    private getScoreElement(): React.ReactElement {
        return (
            <ScaledText style={{ ...this.getTextStyle(), fontSize: '40px', position: 'absolute', left: '50%', top: '7%', transform: 'translate(-50%, -50%)' }}>
                {this.props.gameState.score && this.props.gameState.score}
            </ScaledText>
        );
    }

    private getPauseElement(): React.ReactElement {
        return (
            <ScaledText style={{
                ...this.getTextStyle(), backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: '25px', fontSize: '96px', left: '50%', padding: '20px', position: 'absolute', top: '25%', transform: 'translate(-50%, -50%)',
            }}>Paused</ScaledText>)
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