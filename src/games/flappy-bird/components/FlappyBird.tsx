
import * as React from 'react';
import '../../../App.css';

import Loop from '../../../components/loop/Loop'
import MediaLayer from '../../../components/MediaLayer/MediaLayer'
import World from '../../../components/World/World'

import { Bird } from './bird/Bird';

import ConsoleState from '../../../components/Console/ConsoleState';

import { FlappyUI } from './flappy-ui/FlappyUI';

import GameState from './GameState/GameState';

import { Level } from './level/Level';

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