
import * as React from 'react';
import '../../App.css';

import BoxDropper from '../BoxDropper/BoxDropper';
import BoxGameState from '../BoxGameState/BoxGameState';
import BoxLevel from '../BoxLevel/BoxLevel';
import ConsoleState from '../Console/ConsoleState';
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
                        <ConsoleState>
                            <BoxGameState>
                                <BoxDropper />
                                <BoxLevel />
                            </BoxGameState>
                        </ConsoleState>
                    </World>
                </MediaLayer>
            </Loop>
        );
    }
}

export default BoxGame;