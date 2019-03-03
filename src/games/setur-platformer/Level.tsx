import * as PropTypes from 'prop-types';
import * as React from 'react';

import { IGameStateState } from '../../components/GameState/GameState';

import { gameState } from '../../components/GameState/DefaultProps';

import { Body } from '../../components/body/Body';

import DirtBlock from './assets/sprites/forest_terrain_dirt.png';


import DirtBlockOpts from './assets/sprites/forest_terrain_dirt.json';

import Sprite from '../../components/sprite/Sprite';

export interface ILevelProps {
    gameState?: IGameStateState;
}

export interface ILevelContext {
    scale: number;
    loop: object;
}

export class Level extends React.Component<ILevelProps, {}> {


    public static contextTypes = {
        engine: PropTypes.object,
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
            backgroundPosition: `${Math.floor(((this.context.scale * this.props.gameState!.x!) / 3))}px 0px`,
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

        const platformX = 300;
        const platformY = 300;

        const platform = Array(10).fill(1).map((key: any, index: number) => {
            return (
                <div key={index}>
                    <Sprite y={platformY} x={platformX + (index * 128)} width={512} height={128} src={DirtBlock} opts={DirtBlockOpts} style={{ zIndex: 999999999999 }} />
                    <Body bodyName={'Platform'} dynamic={false} trigger={false} prevX={platformX + (index * 128)} prevY={platformY} x={platformX + (index * 128)} y={platformY} width={1024} height={64} velocity={{ x: 0, y: 0 }} colided={false} />
                </div>
            )

        });

        return (
            <div style={this.getWrapperStyles()}>
                <div style={stageBackground} />
                <div style={floorBackground} />
                <Body bodyName={'Ground'} dynamic={false} trigger={false} prevX={0} prevY={(576 - 64)} x={0} y={(576 - 64)} width={1024} height={64} velocity={{ x: 0, y: 0 }} colided={false} />
                {platform}
                <Sprite y={platformY} x={platformX} width={512} height={128} src={DirtBlock} opts={DirtBlockOpts} style={{ zIndex: 999999999999 }} />
                <Body bodyName={'Platform'} dynamic={false} trigger={false} prevX={platformX} prevY={platformY} x={0} y={platformY} width={1280} height={64} velocity={{ x: 0, y: 0 }} colided={false} />
            </div>
        );
    }

    private getWrapperStyles(): React.CSSProperties {
        return {
/*
            position: 'absolute',
            transform: `translate(${Math.floor(-1 * this.props.gameState!.x! * this.context.scale)}px, 0px) translateZ(0)`,
            transformOrigin: 'left top',
            */
          };
    }
}