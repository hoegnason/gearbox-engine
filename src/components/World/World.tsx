import * as PropTypes from 'prop-types';
import * as React from 'react';
import { PhysicsEngine } from '../../core/physics/physics-engine';
import { Console, IMessage } from './Console';

import GameLoop from '../../core/game-loop/GameLoop';
import { GameLoopSubscription } from '../../core/game-loop/GameLoopSubscription';


interface IWorldProps {
    gravity: object;
}

export interface IWorldState {
    messages: IMessage[]
}

export default class World extends React.Component<IWorldProps, IWorldState> {

    public static defaultProps = {
        gravity: {
            scale: 0.001,
            x: 0,
            y: 1
        }
    };

    public static contextTypes = {
        Log: PropTypes.func,
        loop: PropTypes.object,
        scale: PropTypes.number,
    };

    public static childContextTypes = {
        Log: PropTypes.func,
        engine: PropTypes.object
    };

    private subscription: GameLoopSubscription;
    private engine: any;

    constructor(props: any) {
        super(props);

        this.engine = new PhysicsEngine();
        this.loop = this.loop.bind(this);

        this.Log = this.Log.bind(this);

        this.state = {
            messages: []
        }
    }

    public componentWillReceiveProps(nextProps: IWorldProps) {
        const { gravity } = nextProps;

        if (gravity !== this.props.gravity) {
            this.engine.world.gravity = gravity;
        }
    }

    public componentDidMount() {
        this.subscription = (this.context.loop as GameLoop).subscribe(this.loop);
        this.Log('Yolo sweg!');
    }

    public componentWillUnmount() {

        this.subscription.unsubscribe();
    }

    public getChildContext() {
        return {
            Log: this.Log,
            engine: this.engine,
        };
    }

    public Log(text: string) {
        this.setState(prevState => ({
            messages: [...prevState.messages, { body: text, date: new Date() }]
        }));
    }

    public render() {
        const defaultStyles: React.CSSProperties = {
            height: '100%',
            left: 0,
            position: 'absolute',
            top: 0,
            width: '100%'
        };

        return (
            <div style={defaultStyles}>{this.props.children}{this.Log}
                <div>
                    <Console messages={this.state.messages} />
                </div>
            </div>
        );
    }

    private loop() {
        this.engine.tick();
    }
}