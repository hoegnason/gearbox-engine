import * as PropTypes from 'prop-types';
import * as React from 'react';

import Pipe, { IPipeProps } from '../pipe/Pipe';

import {IGameStateState} from '../GameState/GameState';

interface IPipeGeneratorProps {
    gameState: IGameStateState
}

const pipeOffsetX = 900;

export class PipeGenerator extends React.Component<IPipeGeneratorProps, {}> {

    public static contextTypes = {
        scale: PropTypes.number,
        width: PropTypes.number
    };


    private pipes: IPipeProps[] = [];

    private oldX = 0;

    constructor(props: any) {
        super(props);

        this.pipes = this.generatePipes();
    }

    public shouldComponentUpdate(nextProps: IPipeGeneratorProps, nextState: {}): boolean {

        if (nextProps.gameState.x !== this.oldX) {
            
            return true;
        }

        return false;
    }

    // MovePipes: flutt Pipe og Body component frá App og inn her
    public render() {

        const pipeOffset = pipeOffsetX + (this.props.gameState.x || 0);
        // const speed = (this.state.scrollSpeed) ? this.state.scrollSpeed : 0;

        if ((window as any).debug) {

            const closePipes = this.pipes.filter((pipe) => this.inViewOfCamera).filter((targetPipe: IPipeProps) => {

                if (this.props.gameState.x) {


                    return (Math.abs((targetPipe.x - (-1 * this.props.gameState.x))) < 400);
                }

                return false;
            });

            if (null != closePipes && null != closePipes.length && null != closePipes[0]) {
                (window as any).autoPilotY = Math.floor(((closePipes[0].y * (576 - 176)) + (176 / 2)));
            }

        }

        return (
            <div>
                {this.props.gameState.x && this.pipes.map((pipe: IPipeProps, index: number) => this.inViewOfCamera(-pipeOffsetX + pipeOffset + pipe.x) && <Pipe key={index} x={-pipeOffsetX + pipeOffset + pipe.x} y={pipe.y} />)}
            </div>
        )
    }


    private generatePipes(): IPipeProps[] {

        const pipes: IPipeProps[] = [];

        pipes.push({ x: pipeOffsetX, y: 0.5 });

        // i starts at 2 because the pipe above has already been defined
        for (let i = 2; i < 10000; i++) {
            const randomY =  ( Math.floor(Math.random() * Math.floor(6)) + 2) / 10;
            pipes.push({ x: ((pipeOffsetX + 120) * i), y: randomY });
        }

        return pipes;
    }

    private inViewOfCamera(x: number) {
        // return (x > 0 && x < (this.context.width / this.context.scale));
        return (x > -900 && x < ((this.context.width / this.context.scale) + 900));
    }

}

export default PipeGenerator;