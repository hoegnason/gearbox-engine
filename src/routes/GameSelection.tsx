import * as React from 'react';
import { Link } from 'react-router-dom'


class GameSelection extends React.Component {

  public render() {

    return (
        <div>
            <div>Games</div>
            <div><Link to='/flappybird'>FlappyBird</Link></div>
            <div><Link to='/box'>Box</Link></div>
        </div>
    );
  }
}

export default GameSelection;
