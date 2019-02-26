import * as React from 'react';
import '../../App.css';



import { Loop } from '../../components/loop/Loop';
import MediaLayer from '../../components/MediaLayer/MediaLayer';
import World from '../../components/World/World';



class GameEngine extends React.Component {

  public render() {

    return (
        <Loop>
          <MediaLayer width={1024} height={576}>
            <World />
          </MediaLayer>
        </Loop>

    );
  }
}

export default GameEngine;


