
import * as React from 'react';
import '../../../App.css';

import BoxDropper from './BoxDropper/BoxDropper';
import BoxGameState from './BoxGameState/BoxGameState';
import BoxLevel from './BoxLevel/BoxLevel';
import {BoxUI} from './BoxUI/BoxUI';

import ConsoleState from '../../../components/Console/ConsoleState';
import Loop from '../../../components/loop/Loop'
import MediaLayer from '../../../components/MediaLayer/MediaLayer'
import World from '../../../components/World/World'

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
                                <BoxUI />
                            </BoxGameState>
                        </ConsoleState>
                    </World>
                </MediaLayer>
            </Loop>
        );
    }
}

export default BoxGame;