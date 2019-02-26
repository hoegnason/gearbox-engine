import * as PropTypes from 'prop-types';
import * as React from 'react';
import { PhysicsEngine } from '../../core/physics/physics-engine';

import GameLoop from '../../core/game-loop/GameLoop';
import { GameLoopSubscription } from '../../core/game-loop/GameLoopSubscription';


interface IWorldProps {
    gravity: object;
}

let lastLoop = 0;

export default class World extends React.Component<IWorldProps, {}> {

    public static defaultProps = {
        gravity: {
            scale: 0.001,
            x: 0,
            y: 1
        }
    };

    public static contextTypes = {
        loop: PropTypes.object,
        scale: PropTypes.number
    };

    public static childContextTypes = {
        engine: PropTypes.object
    };

    private subscription: GameLoopSubscription;
    private engine: any;

    // private lastTime = 0;

    constructor(props: any) {
        super(props);

        this.engine = new PhysicsEngine();
        this.loop = this.loop.bind(this);

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
    }

    public componentWillUnmount() {

        this.subscription.unsubscribe();
    }

    public getChildContext() {
        return {
            engine: this.engine
        };
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
            <div style={defaultStyles}>
                {this.props.children}
            </div>
        );
    }

    private loop() {

        // 60 frames per sec!
        const currTime = 1 * Date.now();

        if ((lastLoop + 1000 / 60) < currTime) {

            this.engine.tick();

            lastLoop = currTime;
        }
    }
}