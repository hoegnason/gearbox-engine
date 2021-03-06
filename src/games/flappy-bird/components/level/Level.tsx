import * as PropTypes from 'prop-types';
import * as React from 'react';

import PipeGenerator from '../PipeGenerator/PipeGenerator';

import { IGameStateState } from '../GameState/GameState';

import { gameState } from '../GameState/DefaultProps';

import { Body } from '../../../../components/body/Body';

export interface ILevelProps {
    gameState?: IGameStateState;
}

export interface ILevelContext {
    scale: number;
    loop: object;
}

export class Level extends React.Component<ILevelProps, {}> {


    public static contextTypes = {
        scale: PropTypes.number
    };

    public static defaultProps: ILevelProps = { gameState }

    private oldX = 0;

    public shouldComponentUpdate(nextProps: ILevelProps, nextState: {}) {

        if (nextProps.gameState!.x !== this.oldX) {

            this.oldX = nextProps.gameState!.x!;

            return true;
        }

        return false;
    }

    public render() {

        const stageBackground: React.CSSProperties = {
            backgroundImage: 'url(./assets/sprites/SkyTileSprite.png)',
            backgroundPosition: `${Math.floor(( (this.context.scale * this.props.gameState!.x!) / 3 ))}px 0px`,
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto 100%',
            height: '100%',
            left: 0,
            margin: '0 auto',
            position: 'absolute',
            top: 0,
            width: '100%',
        };

        const floorBackground: React.CSSProperties = {
            backgroundImage: 'url(./assets/sprites/GrassThinSprite.png)',
            backgroundPosition: `${Math.floor((this.context.scale * this.props.gameState!.x!))}px 0px`,
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto 100%',
            bottom: 0,
            height: '112px',
            left: 0,
            margin: '0 auto',
            position: 'absolute',
            width: '100%',
        };

        return (
            <div>
                <div style={stageBackground} />
                <PipeGenerator gameState={this.props.gameState} />
                <div style={floorBackground} />
                <Body bodyName={'Ground'} dynamic={false} trigger={false} prevX={0} prevY={(576 - 64)} x={0} y={(576 - 64)} width={1024} height={64} velocity={{ x: 0, y: 0 }} colided={false} />
            </div>
        );
    }
}