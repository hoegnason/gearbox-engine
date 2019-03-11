import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';

import BoxGame from './components/Games/BoxGame'
import FlappyBird from './components/Games/FlappyBird';
import SeturPlatformer from './components/Games/SeturPlatformer';
import GameSelection from './routes/GameSelection';


class App extends React.Component {

  public render() {

    return (


      <div className="App" style={{ width: '100%', height: '100%' }}>

        <Router>
          <Switch>
            <Route exact={true} path='/' component={GameSelection} />
            <Route path='/flappybird' component={FlappyBird} />
            <Route path='/boxgame' component={BoxGame} />
            <Route path='/setur_platformer' component={SeturPlatformer} />
          </Switch>
        </Router>
      </div>

    );
  }
}

export default App;
