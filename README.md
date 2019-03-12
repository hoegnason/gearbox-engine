# gearbox-engine


[![Build Status](https://travis-ci.com/hoegnason/gearbox-engine.svg?token=ysKrYZyzrxh4z4D6yvgL&branch=master)](https://travis-ci.com/hoegnason/gearbox-engine)



This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
# Gearbox Engine #
Want to see the Gearbox engine in action?

Take a look at [these games!](https://hoegnason.github.io/gearbox-engine/#/)
# Instructions

*Welcome to the Gearbox Engine!*

To get the engine, follow these instructions:

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

# Implementing the Game Engine #

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
# Building Your Game #
Here are some things you might want to know when using the Gearbox Engine:

*note: we will refer Game Objects (That also are React components) that you create as 'Entities'*

## Game Loop ##
If you have an entity that wants to be in sync with the game loop of the game engine, all you have to do is retreive it using the React Legacy Context by writing this in your entity:
```
public static contextTypes = {
        loop: PropTypes.object,
    };
```
With loop you can use start() or stop() to begin or pause the game loop.

## Physics Engine ##
If you wish to have a function in sync with the Physics Engine update cycle, you can simply add it to its update function:

```
this.context.engine.update = this.loop;
```
After having retreived the engine through context:
```
public static contextTypes = {
        engine: PropTypes.object,
    };
```

## Body ##
If you want an entity to have physics applied to it, then you will have to render the <Body> component with the necessary props:
```
render() {
    return (
      <div>
        <Body
          bodyName={'Bird'}
          ref={b => { this.body = b; }}
          onCollision={this.onCollision}
          dynamic={true}
          trigger={false}
          x={xOffset}
          y={yOffset}
          width={25}
          height={25}
          velocity={{ x: 0, y: 0 }}
          colided={false}
        />
    </div>
    )
}
```

## Sprite ##
If you want sprite animation for an entity, you can render the sprite component and add necessary props:

```
render() {
    return (
      <div>
        <Sprite
          x={50}
          y={50}
          width={67}
          height={113}
          src={image}
          opts={imageOpts}
          steps={['image_1', 'image_0']}
          ticksPerFrame={15}
          rotate={attitude}
          animate={true} />
      </div>
    )
}
```

## Audio Manager ##
To play sounds you can add sounds to the AudioManager:
```
AudioManager.loadSoundFile('game_over', require('../../../../assets/sound/game_over.ogg'), false);

```
Then play that sound where needed:
```
AudioManager.playSound('game_over');
```

## KeyboardSubject ##
To read the keyboard for input, your entity can subscribe to the keyboard observer
```
    this.keyboardSubscription = createKeyboardObservable({ touchKey: ' ' }).subscribe((key: string) => {

        if (' ' === key) {
            this.jump();
        }
      }
    });
```

You will have to import:
```
import { Subscription } from 'rxjs';
import { createKeyboardObservable } from '../../../../core/hid/keyboardSubject';
```
for it to work

## Console Log ##
Lastly, if you want to add messages to the console log you simply retreive the Log function from React Legacy Context:

```
public static contextTypes = {
        Log: PropTypes.func,
    };
```

And add a string as parameter:

```
this.context.Log('This is a console message!');
```

Note, that to be able to see the messages you have to enable debug mode:
```
(window as any).debug = true;
```




Well, that's it from us, 
**Enjoy Making Games!**
