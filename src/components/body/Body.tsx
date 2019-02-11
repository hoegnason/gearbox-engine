import * as PropTypes from 'prop-types';
import * as React from 'react';
import { IBody, PhysicsEngine } from 'src/core/physics/physics-engine';

export interface IBodyProps extends IBody {
    children?: object;
    style?: object;
    onCollision?: () => { /* */ };
};

export class Body extends React.Component<IBodyProps, IBodyProps> {

    public static displayName = 'Body';

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
        };
        const styles = { ...defaultStyles, ...this.props.style };

        return (
            <div style={styles}>
                {this.props.children}
            </div>
        );
    }
}

export default Body;