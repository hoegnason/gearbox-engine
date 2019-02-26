
import * as React from 'react';
import '../../App.css';


import Box from '../box/Box';
import BoxLevel from '../BoxLevel';
import GameState from '../GameState/GameState';

/*
interface IFlappyBirdProps {

}

interface IFlappyBirdState {

}*/

class BoxGame extends React.Component {

    public render() {

        return (
            <div>
                <GameState>
                    <BoxLevel />
                    <Box />  
                </GameState>
            </div>
        );   
    }
}

export default BoxGame;