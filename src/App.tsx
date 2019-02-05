import * as React from 'react';
import './App.css';

import Level from './components/Level';
import { Loop } from './components/loop/Loop';
import MediaLayer from './components/MediaLayer';
import World from './components/World';

// import logo from './logo.svg';

// const engine = () => { /* */ };

class App extends React.Component {

  public render() {
    const stageBackground: React.CSSProperties = { background: 'url(assets/flappy-background-day.png) center repeat-x', backgroundSize: 'auto 100%', margin: '0 auto' };

    return (
      <div className="App">
        <Loop style={ {width: 1920, height: 1080, margin: '0 auto'} /* {width: 600, height: 400, margin: '0 auto'} */ }>
          <MediaLayer width={1024} height={576} style={stageBackground}>
            <World engine={{}}>
              <Level />
            </World>
          </MediaLayer>
        </Loop>
      </div>
    );
  }
}

export default App;
