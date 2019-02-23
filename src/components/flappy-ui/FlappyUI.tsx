import * as PropTypes from 'prop-types';
import * as React from 'react';
import { IGameStateState } from '../GameState/GameState';

import {gameState} from '../GameState/DefaultProps';

interface IFlappyUIProps {
    gameState: IGameStateState;
}

export class FlappyUI extends React.Component<IFlappyUIProps, {}> {

    public static contextTypes = {
        height: PropTypes.number,
        loop: PropTypes.object,
        scale: PropTypes.number,
        width: PropTypes.number
    }

    public static defaultProps: IFlappyUIProps = {gameState}

    private oldProps: IGameStateState = {};

    public shouldComponentUpdate(nextProps: IFlappyUIProps, nextState: {}) {
        
        if ((this.oldProps.debug !== nextProps.gameState.debug) || (this.oldProps.gameOver !== nextProps.gameState.gameOver) || (this.oldProps.paused !== nextProps.gameState.paused) || (this.oldProps.score !== nextProps.gameState.score)) {
            
            this.oldProps = nextProps.gameState;
            
            return true;
        }

        return false;
    }

    public render() {

        return (
            <div style={this.getWrappedStyle()}>
                {this.props.gameState.paused && this.getPauseElement() }
                {this.props.gameState.gameOver && this.getGameOverElement()}
                {this.getScoreElement()}
                {!this.props.gameState.paused && this.props.gameState.debug && this.getDebugElement()}
            </div>);
    }

    private getDebugElement(): React.ReactElement {
        return (
            <div style={{
                ...this.getTextStyle(), backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: '25px', fontFamily: "'Luckiest Guy', cursive", fontSize: 24 * this.context.scale, left: '50%', padding: `${this.context.scale * 20}px`, position: 'absolute', top: '20%', transform: 'translate(-50%, -50%)',

                /* transform: `translate(${(this.context.width / 2)}px, ${(this.context.height / 2)}px)`, */ /* height: '100%', width: '100%', */
            }}>Debug Mode!<p
                style={{
                    color: 'gold',
                    fontSize: (18 * this.context.scale),
                    // tslint:disable-next-line:object-literal-sort-keys
                    WebkitTextFillColor: 'gold',
                    WebkitTextStrokeColor: 'black',
                    WebkitTextStrokeWidth: '`${1 * this.context.scale}px`'
                }}>Auto Pilot Activated!</p></div>)
    }

    private getScoreElement(): React.ReactElement {
        return (
            <div style={{...this.getTextStyle(), fontSize: (50 * this.context.scale)}}>
                {this.props.gameState.score && this.props.gameState.score}
            </div>
        )
    }

    private getPauseElement(): React.ReactElement {
        return (
            <div style={{
                ...this.getTextStyle(), backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: '25px', fontFamily: "'Luckiest Guy', cursive", fontSize: 96 * this.context.scale, left: '50%', padding: `${this.context.scale * 20}px`, position: 'absolute', top: '20%', transform: 'translate(-50%, -50%)',

                /* transform: `translate(${(this.context.width / 2)}px, ${(this.context.height / 2)}px)`, */ /* height: '100%', width: '100%', */
            }}>Paused</div>)
    }

    private getGameOverElement(): React.ReactElement {
        return (<div style={{ ...this.getTextStyle(), position: 'absolute', transform: `translate(0px, ${this.context.scale * 75}px)`, height: '100%', width: '100%', fontFamily: "'Luckiest Guy', cursive" }}>Game Over!</div>);
    }

    private getTextStyle(): React.CSSProperties {
        return {
            WebkitTextFillColor: 'white',
            WebkitTextStrokeColor: 'black',
            WebkitTextStrokeWidth: `${2 * this.context.scale}px`
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