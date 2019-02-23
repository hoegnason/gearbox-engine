import * as React from 'react';
import './App.css';

import { Bird } from './components/bird/Bird';

import GameState from './components/GameState/GameState';

import { Loop } from './components/loop/Loop';
import MediaLayer from './components/MediaLayer/MediaLayer';
// import Pipe from './components/pipe/Pipe';
import World from './components/World/World';

import { FlappyUI } from './components/flappy-ui/FlappyUI';

import ConsoleState from './components/Console/ConsoleState';
import Level from './components/Level';

class App extends React.Component {

  public render() {

    // MovePipes: Flutt Pipes og Body componentin inn í GameState componentin
    return (
      <div className="App" style={{ width: '100%', height: '100%' }}>
        <Loop>
          <MediaLayer width={1024} height={576}>
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
      </div>
    );
  }
}

export default App;
