import * as React from 'react';
import './App.css';

// import Body from './components/body/Body';
import GameState from './components/GameState/GameState';

import { Loop } from './components/loop/Loop';
import MediaLayer from './components/MediaLayer/MediaLayer';
// import Pipe from './components/pipe/Pipe';
import World from './components/World/World';

import ConsoleState from './components/Console/ConsoleState';

class App extends React.Component {

  public render() {

    const stageBackground: React.CSSProperties = { background: 'url(assets/flappy-background-day.png) center repeat-x', backgroundSize: 'auto 100%', margin: '0 auto' };

    // MovePipes: Flutt Pipes og Body componentin inn í GameState componentin
    return (
      <div className="App" style={{ width: '100%', height: '100%' }}>
        <Loop>
          <MediaLayer width={1024} height={576} style={stageBackground}>
            <World>
              <ConsoleState>
                <GameState />
              </ConsoleState>
            </World>
          </MediaLayer>
        </Loop>
      </div>
    );
  }
}

export default App;
