
import * as React from 'react';
import '../../App.css';


import Loop from '../loop/Loop'
import MediaLayer from '../MediaLayer/MediaLayer'
import World from '../World/World'
// import GameEngine from '../../core/GameEngine/GameEngine'

import { Bird } from '../bird/Bird';

import GameState from '../GameState/GameState';

// import Pipe from './components/pipe/Pipe';

import { FlappyUI } from '../flappy-ui/FlappyUI';

import ConsoleState from '../Console/ConsoleState';
import {Level} from '../Level';



/*
interface IFlappyBirdProps {

}

interface IFlappyBirdState {

}*/

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