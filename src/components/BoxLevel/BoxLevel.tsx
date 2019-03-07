import * as PropTypes from 'prop-types';
import * as React from 'react';

import { IBoxGameStateState } from '../BoxGameState/BoxGameState';

import { gameState } from '../GameState/DefaultProps';

import { Body } from '../body/Body';

export interface ILevelProps {
    gameState?: IBoxGameStateState;
}

export interface ILevelContext {
    scale: number;
    loop: object;
}

export default class Level extends React.Component<ILevelProps, {}> {


    public static contextTypes = {
        scale: PropTypes.number
    };

    public static defaultProps: ILevelProps = { gameState }

    public render() {

        const stageBackground: React.CSSProperties = {
            backgroundImage: 'url(./assets/sprites/box-sky.png)',
            backgroundPosition: `${Math.floor(( (this.context.scale * 500) / 3 ))}px 0px`,
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
            backgroundPosition: `${Math.floor((this.context.scale * 500))}px 0px`,
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
                <div style={floorBackground} />
                <Body bodyName={'Wall2'} dynamic={false} trigger={false} prevX={1000} prevY={0} x={1000} y={0} width={64} height={1024} velocity={{ x: 0, y: 0 }} colided={false} />
                <Body bodyName={'Ground'} dynamic={false} trigger={false} prevX={0} prevY={550} x={0} y={550} width={1024} height={64} velocity={{ x: 0, y: 0 }} colided={false} />
                <Body bodyName={'Wall'} dynamic={false} trigger={false} prevX={0} prevY={0} x={0} y={0} width={64} height={1024} velocity={{ x: 0, y: 0 }} colided={false} />
            </div>
        );
    }

    
}