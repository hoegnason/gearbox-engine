import * as PropTypes from 'prop-types';
import * as React from 'react';

export interface ISpriteProps {
    height: number;
    src: string;
    style?: React.CSSProperties;
    width: number;
    x: number;
    y: number;
}

export default class Sprite extends React.Component<ISpriteProps, {}> {

    public static propTypes = {
        height: PropTypes.array,
        src: PropTypes.string,
        styles: PropTypes.func,
        width: PropTypes.number,
        x: PropTypes.number,
        y: PropTypes.number
    };

    public static defaultProps = {
        height: 0,
        src: PropTypes.string,
        styles: {},
        width: 0,
        x: 0,
        y: 0,
    };

    public static contextTypes = {
        loop: PropTypes.object,
        scale: PropTypes.number
    };

    // TODO: Fix types!
    /*
    public shouldComponentUpdate(nextProps: any, nextState: any, nextContext: any) {
        return this.context.scale !== nextContext.scale;
    }
    */

    public render() {

        return (
            <img style={{...this.getInnerStyles(), ...this.props.style}} src={this.props.src} />
        );
    }

    /*

    private getWrapperStyles(): React.CSSProperties {
        return {
            
            height: '100%',
            left: 0,
            position: 'absolute',
            top: 0,
            width: '100%'
        };
    }
    */

    private getInnerStyles(): React.CSSProperties {
        return {
            height: Math.floor((this.props.height * this.context.scale)),
            left: Math.floor((this.props.x * this.context.scale)),
            position: 'absolute',
            top: Math.floor((this.props.y * this.context.scale)),
            /*
            transform: `translate(${Math.floor((this.props.x * this.context.scale))}px, ${Math.floor((this.props.y * this.context.scale))}px)`,
            transformOrigin: 'left top',
            */
            width: Math.floor((this.props.width * this.context.scale)),
        };
    }
}