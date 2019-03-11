import * as PropTypes from 'prop-types';
import * as React from 'react';
import { IBody, PhysicsEngine } from '../../core/physics/physics-engine';

export interface IBodyProps extends IBody {
    children?: object;
    style?: object;
};

export class Body extends React.Component<IBodyProps, {}> {

    public static contextTypes = {
        engine: PropTypes.object,
        loop: PropTypes.object,
        scale: PropTypes.number
    };

    public body: IBodyProps;
    private initialized = false;

    constructor(props: any) {
        super(props);

        this.body = {
            colided: false,
            dynamic: false,
            height: 0,
            rest: false,
            trigger: false,
            velocity: {x: 0, y: 0},
            width: 0,
            x: 0,
            y: 0,
        }

        if (this.body.prevY == null){
            this.body.prevY = this.body.y;
        }
        if (this.body.prevX == null){
            this.body.prevX = this.body.x;
        }
    }

    public shouldComponentUpdate(props: IBodyProps, prevState: {}): boolean {
        
        if ((window as any).debug) {

            return true;
        }

        return false;
    }

    public componentWillReceiveProps(props: IBodyProps) {
        // Add to body only once
        if (null != props && !this.initialized) {
            this.initialized = true;

            this.body = { ...props };
            (this.context.engine as PhysicsEngine).addBody(this.body);
        }

        // Updates this.body with new props if it is a static body
        if (this.initialized && !this.body.dynamic) {
            Object.keys(props).forEach((key: string) => {
                this.body[key] = props[key];
            });
        }
    }

    public componentWillUnmount() {
        (this.context.engine as PhysicsEngine).removeBody(this.body);
    }

    public render() {
        const defaultStyles: React.CSSProperties = {
            
            height: '100%',
            width: '100%',
            zIndex: 999999
        };
        const styles = { ...defaultStyles, ...this.props.style };

        const bodyStyles: React.CSSProperties = {
            backgroundColor: 'rgba(0, 255, 0, 0.3)',
            height: (this.props.height * this.context.scale),
            position: 'absolute',
            transform: `translate(${this.body.x * this.context.scale}px, ${this.body.y * this.context.scale}px)`,
            transformOrigin: 'left top',
            width: (this.props.width * this.context.scale),
            zIndex: 999999
        };

        return (
            <div style={styles}>
                <div style={((window as any).debug) ? {...bodyStyles, display: 'block'} : {display: 'none'}} />
            </div>
        );
    }
}

export default Body;