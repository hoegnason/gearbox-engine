import * as PropTypes from 'prop-types';
import * as React from 'react';

import { IGameStateState } from '../GameState/GameState';

import { gameState } from '../GameState/DefaultProps';

import { Body } from '../body/Body';

export interface ILevelProps {
    gameState?: IGameStateState;
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

    public componentDidMount() {
        ((window as any).debug)= true;
    }

    public componentWillUnmount(){
        ((window as any).debug)= true;
    }

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
                <Body bodyName={'Ground'} dynamic={false} prevX={0} prevY={0} x={0} y={300} width={1024} height={64} velocity={{ x: 0, y: 0 }} colided={false} />
            </div>
        );
    }

    
}