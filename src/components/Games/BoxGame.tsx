
import * as React from 'react';
import '../../App.css';

import Box from '../box/Box';
import BoxLevel from '../BoxLevel/BoxLevel';
import GameState from '../GameState/GameState';
import Loop from '../loop/Loop'
import MediaLayer from '../MediaLayer/MediaLayer'
import World from '../World/World'



/*
interface IFlappyBirdProps {

}

interface IFlappyBirdState {

}*/

class BoxGame extends React.Component {

    public render() {

        return (
            <Loop>
                <MediaLayer width={1024} height={576}>
                    <World>
                        <GameState>
                            <BoxLevel />
                            <Box />
                        </GameState>
                    </World>
                </MediaLayer>
            </Loop>
        );
    }
}

export default BoxGame;