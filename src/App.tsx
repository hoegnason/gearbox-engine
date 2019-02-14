import * as React from 'react';
import './App.css';

import Bird from './components/bird/Bird';
import Body from './components/body/Body';
import Level from './components/Level';
import { Loop } from './components/loop/Loop';
import MediaLayer from './components/MediaLayer/MediaLayer';
import Pipe from './components/pipe/Pipe';
import World from './components/World';


// import logo from './logo.svg';

// const engine = () => { /* */ };

class App extends React.Component {

  private body: any;

  public componentDidMount() {
    setInterval(() => {

      if (null != this.body && null != this.body.body) {
        // tslint:disable-next-line
        console.log(this.body.body);
      }
    }, 1000);
  }

  public render() {
    const stageBackground: React.CSSProperties = { background: 'url(assets/flappy-background-day.png) center repeat-x', backgroundSize: 'auto 100%', margin: '0 auto' };

    return (
      <div className="App">
        <Loop style={{ width: 1920, height: 1080, margin: '0 auto' } /* {width: 600, height: 400, margin: '0 auto'} */}>
          <MediaLayer width={1024} height={576} style={stageBackground}>
            <World>
              <Level />
              <Pipe x={500} />
              <Bird />
              <Body dynamic={false} x={0} y={(576 - 64)} width={1024} height={64} velocity={{ x: 0, y: 0 }} colided={false} />
            </World>
          </MediaLayer>
        </Loop>
      </div>
    );
  }
}

export default App;
