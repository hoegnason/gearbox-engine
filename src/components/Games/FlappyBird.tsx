
import * as React from 'react';
import '../../App.css';


import { Bird } from '../bird/Bird';

import GameState from '../GameState/GameState';

// import Pipe from './components/pipe/Pipe';

import { FlappyUI } from '../flappy-ui/FlappyUI';

import ConsoleState from '../Console/ConsoleState';
import Level from '../Level';

/*
interface IFlappyBirdProps {

}

interface IFlappyBirdState {

}*/

class FlappyBird extends React.Component {

    public render() {

        return (
        <ConsoleState>
            <GameState>
                <Level />
                <Bird />
                <FlappyUI />
            </GameState>
        </ConsoleState>
                   );      
    }
}

export default FlappyBird;