import * as PropTypes from 'prop-types';
import * as React from 'react';
import { PhysicsEngine } from '../core/physics/physics-engine';
import { Console } from './MediaLayer/Console';




type physicsCallback = () => {};

export interface IWorldProps {
    gravity: object;
    onInit: (opts: any) => {};
    onUpdate: physicsCallback;
}

export interface IWorldState {
    gravity: object;
    engine: object;
}

// const engine = () =>  { /* */ };

export default class World extends React.Component<IWorldProps> {

    public static propTypes = {
        children: PropTypes.any,
        gravity: PropTypes.shape({
            scale: PropTypes.number,
            x: PropTypes.number,
            y: PropTypes.number
        }),
        onCollision: PropTypes.func,
        onInit: PropTypes.func,
        onUpdate: PropTypes.func,
    };

    public static defaultProps = {
        gravity: {
            scale: 0.001,
            x: 0,
            y: 1
        },
        onCollision: () => { /* */ },
        onInit: () => { /* */ },
        onUpdate: () => { /* */ },
    };

    public static contextTypes = {
        console: PropTypes.object,
        loop: PropTypes.object,
        scale: PropTypes.number
    };

    public static childContextTypes = {
        engine: PropTypes.object
    };

    private lastTime: number | null;
    private loopID: number | null;
    private engine: any;

    constructor(props: any) {
        super(props);

        this.loopID = null;
        this.lastTime = null;

        // const world = Matter.World.create({ gravity: props.gravity });

        /*
        this.engine = Engine.create({
            world,
        });
        */

        this.engine = new PhysicsEngine();
        this.loop = this.loop.bind(this);
    }

    public componentWillReceiveProps(nextProps: IWorldProps) {
        const { gravity } = nextProps;

        if (gravity !== this.props.gravity) {
            this.engine.world.gravity = gravity;
        }
    }

    public componentDidMount() {
        this.loopID = this.context.loop.subscribe(this.loop);
        this.props.onInit(this.engine);
        (this.context.console as Console).Log('Yolo sweg!'); // Testing console

        /*
        Events.on(this.engine, 'afterUpdate', this.props.onUpdate);
        Events.on(this.engine, 'collisionStart', this.props.onCollision);
        */
    }

    public componentWillUnmount() {
        this.context.loop.unsubscribe(this.loopID);

        /*
        Events.off(this.engine, 'afterUpdate', this.props.onUpdate);
        Events.off(this.engine, 'collisionStart', this.props.onCollision);
        */
    }

    public getChildContext() {
        return {
            engine: this.engine,
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

        const consoleStyle: React.CSSProperties = {
            alignContent: 'left',
            backgroundColor: 'gray',
            height: '25%',
            left: 0,
            overflow: 'scroll',
            position: 'absolute',
            scale: "50%",
            top: 0,
            width: '20%'
        }

        const showConsole = (this.context.console as Console).getLog().map((text, key) => {
            return <div key = {key} style= {{textAlign: 'left', fontSize: '20px'}}>{text}</div>
        });

        return <div style={defaultStyles}>{this.props.children}<div style = {consoleStyle}>{showConsole}</div></div>;
    }

    private loop() {
        const currTime = 0.001 * Date.now();
        /*
        Engine.update(
            this.engine,
            1000 / 60,
            this.lastTime ? currTime / this.lastTime : 1
        );
        */
        if (null != this.lastTime && currTime > this.lastTime) {

            this.engine.tick();

            this.lastTime = currTime;
        }
        this.lastTime = currTime;
    }
}