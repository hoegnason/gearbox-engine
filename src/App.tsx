import * as React from 'react';
import './App.css';

// import Body from './components/body/Body';
import GameState from './components/GameState/GameState';
import { Loop } from './components/loop/Loop';
import MediaLayer from './components/MediaLayer/MediaLayer';
// import Pipe from './components/pipe/Pipe';
import World from './components/World/World';

class App extends React.Component {

  public render() {
    const stageBackground: React.CSSProperties = { background: 'url(assets/flappy-background-day.png) center repeat-x', backgroundSize: 'auto 100%', margin: '0 auto' };

    // MovePipes: Flutt Pipes og Body componentin inn í GameState componentin
    return (
      <div className="App">
        <Loop style={{ width: 1920, height: 1080, margin: '0 auto' }}>
          <MediaLayer width={1024} height={576} style={stageBackground}>
            <World>
              <GameState />
            </World>
          </MediaLayer>
        </Loop>
      </div>
    );
  }
}

export default App;
