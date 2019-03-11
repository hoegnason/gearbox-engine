
import * as React from 'react';
import '../../App.css';

import Loop from '../loop/Loop'
import MediaLayer from '../MediaLayer/MediaLayer'
import World from '../World/World'

import { Bird } from '../bird/Bird';
import ConsoleState from '../Console/ConsoleState';
import { FlappyUI } from '../flappy-ui/FlappyUI';
import GameState from '../GameState/GameState';
import { Level } from '../Level';

class FlappyBird extends React.Component {

    public render() {

        return (
            <Loop>
                <MediaLayer>
                    <World>
                        <ConsoleState>
                            <GameState>
                                <Level />
                                <Bird />
                                <FlappyUI />
                            </GameState>
                        </ConsoleState>
                    </World>
                </MediaLayer>
            </Loop>
        );
    }
}

export default FlappyBird;