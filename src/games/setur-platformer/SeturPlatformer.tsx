
import * as React from 'react';
import '../../App.css';


import Loop from '../../components/loop/Loop'
import MediaLayer from '../../components/MediaLayer/MediaLayer'
import World from '../../components/World/World'
// import GameEngine from '../../core/GameEngine/GameEngine'


import GameState from '../flappy-bird/components/GameState/GameState';

// import Pipe from './components/pipe/Pipe';

import ConsoleState from '../../components/Console/ConsoleState';
import { Level } from './Level';



import Mario from './Mario';


class SeturPlatformer extends React.Component {

    public render() {

        return (
            <Loop>
                <MediaLayer>
                    <World>
                        <ConsoleState>
                            <GameState>
                                <Level />
                                <Mario />
                            </GameState>
                        </ConsoleState>
                    </World>
                </MediaLayer>
            </Loop>
        );
    }
}

export default SeturPlatformer;