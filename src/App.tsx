import * as React from 'react';
import { BrowserRouter as Router, Route,  Switch} from 'react-router-dom'
import './App.css';



import { Loop } from './components/loop/Loop';
import MediaLayer from './components/MediaLayer/MediaLayer';
// import Pipe from './components/pipe/Pipe';
import World from './components/World/World';

import BoxGame from './components/Games/BoxGame'
import FlappyBird from './components/Games/FlappyBird';
import GameSelection from './routes/GameSelection';


class App extends React.Component {

  public render() {

    // MovePipes: Flutt Pipes og Body componentin inn í GameState componentin
    return (

          
          <div className="App" style={{ width: '100%', height: '100%' }}>
            <Loop>
              <MediaLayer width={1024} height={576}>
                <World>
                  <Router>
                    <Switch>
                      <Route exact={true} path='/' component={GameSelection} />
                      <Route exact={true} path='/flappybird' component={FlappyBird} />
                      <Route exact={true} path='/box' component={BoxGame} />
                    </Switch>
                  </Router>
                </World>
              </MediaLayer>
            </Loop>
          </div>
        
    );
  }
}

export default App;
