
import * as React from 'react';
import '../../App.css';


import Loop from '../loop/Loop'
import MediaLayer from '../MediaLayer/MediaLayer'
import World from '../World/World'
// import GameEngine from '../../core/GameEngine/GameEngine'


import GameState from '../GameState/GameState';

// import Pipe from './components/pipe/Pipe';

import { Level } from '../../games/setur-platformer/Level';
import ConsoleState from '../Console/ConsoleState';


import Mario from '../../games/setur-platformer/Mario';


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