# gearbox-engine


[![Build Status](https://travis-ci.com/hoegnason/gearbox-engine.svg?token=ysKrYZyzrxh4z4D6yvgL&branch=master)](https://travis-ci.com/hoegnason/gearbox-engine)



This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
# Instructions

Clone the repository
```
git clone https://github.com/hoegnason/gearbox-engine.git
```
Open the project folder in the terminal and run 
```
npm install
```
Now you can start the game with the command 
```
npm start
```
To run the unit tests run the command 
```
npm test
```

## Implementing the Game Engine ##

To use the game engine simply import the following components: Loop, MediaLayer, World, and ConsoleState.

If you are building your game inside the demo 'games' folder, then it should look something like this:
```
import ConsoleState from '../../../components/Console/ConsoleState';
import Loop from '../../../components/loop/Loop'
import MediaLayer from '../../../components/MediaLayer/MediaLayer'
import World from '../../../components/World/World'
```
Then, of course, import any components that you have built for the game and nest them all together:
```
class MyGame extends React.Component {

    public render() {

        return (
            <Loop>
                <MediaLayer}>
                    <World>
                        <ConsoleState>
                             // Your game goes here
                        </ConsoleState>
                    </World>
                </MediaLayer>
            </Loop>
        );
    }
}
```
