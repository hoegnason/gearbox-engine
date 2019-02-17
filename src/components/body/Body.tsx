import * as PropTypes from 'prop-types';
import * as React from 'react';
import { IBody, PhysicsEngine } from 'src/core/physics/physics-engine';

export interface IBodyProps extends IBody {
    children?: object;
    style?: object;
};

export class Body extends React.Component<IBodyProps, IBodyProps> {

    public static contextTypes = {
        engine: PropTypes.object,
        loop: PropTypes.object,
        scale: PropTypes.number
    };
  
    public static childContextTypes = {
        body: PropTypes.object
    };

    public body: IBodyProps;

    constructor(props: any) {
        super(props);
    }

    public getChildContext() {
        return {
            body: this.body
        };
    }

    public componentWillReceiveProps(props: IBodyProps) {
        if (null != props && null == this.body) {
            this.body = { ...props };
            (this.context.engine as PhysicsEngine).addBody(this.body);
        }

        /*
        if (null != props) {
            
        }
        */
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
            width: (this.props.width * this.context.scale),
            zIndex: 999999,
        };

        if (null != this.body) {
            bodyStyles.position = 'absolute';
            bodyStyles.transform = `translate(${this.body.x * this.context.scale}px, ${this.body.y * this.context.scale}px)`;
            bodyStyles.transformOrigin = 'left top';
        }

        return (
            <div style={styles}>
                <div style={bodyStyles} />
            </div>
        );
    }
}

export default Body;