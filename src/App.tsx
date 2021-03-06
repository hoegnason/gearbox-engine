import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';

import BoxGame from './games/box-game/components/BoxGame'
import FlappyBird from './games/flappy-bird/components/FlappyBird';

import GameSelection from './routes/GameSelection';


class App extends React.Component {

  // Renders Game Selection screen by default. GameSelection contains links to game paths.
  public render() {

    return (


      <div className="App" style={{ width: '100%', height: '100%' }}>

        <Router>
          <Switch>
            <Route exact={true} path='/' component={GameSelection} />
            <Route path='/flappybird' component={FlappyBird} />
            <Route path='/boxgame' component={BoxGame} />
          </Switch>
        </Router>
      </div>

    );
  }
}

export default App;
