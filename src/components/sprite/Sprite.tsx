import * as PropTypes from 'prop-types';
import * as React from 'react';

export interface ISpriteProps {
    height: number;
    src: string;
    style?: React.CSSProperties;
    width: number;
    x: number;
    y: number;
    opts: object;
}

export interface ISpriteTile {
    height: number;
    width: number;
    x: number;
    y: number;
}

export interface ISpriteState {
    spriteTile?: ISpriteTile;
}

export default class Sprite extends React.Component<ISpriteProps, ISpriteState> {

    public static propTypes = {
        height: PropTypes.number,
        opts: PropTypes.object,
        src: PropTypes.string,
        style: PropTypes.object,
        width: PropTypes.number,
        x: PropTypes.number,
        y: PropTypes.number
    };

    public static defaultProps = {
        height: 0,
        opts: {},
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

    public constructor(props: any) {
        super(props);

        this.state = {};
    }

    public render() {

        return (
            <div style={this.getWrapperStyles()}>
                <img style={{ ...this.getInnerStyles(), ...this.props.style }} src={this.props.src} />
            </div>
        );
    }

    public componentWillReceiveProps(nextProps: ISpriteProps) {

        if (null != nextProps && null != nextProps.opts && null != nextProps.opts['sprite-sheet'] && null != nextProps.opts['sprite-sheet'][0]) {

            const tile = nextProps.opts['sprite-sheet'][1];

            this.setState({ spriteTile: tile });
        }
    }

    private getWrapperStyles(): React.CSSProperties {

        if (null != this.state.spriteTile) {
            return {
                height: this.scale(this.state.spriteTile.height * this.context.scale),
                left: this.scale(this.props.x * this.context.scale),
                overflow: 'hidden',
                position: 'absolute',
                top: this.scale(this.props.y),
                transformOrigin: 'top left',
                /*
                transform: `translate(${Math.floor((this.props.x * this.context.scale))}px, ${Math.floor((this.props.y * this.context.scale))}px)`,
                transformOrigin: 'left top',
                */
                width: this.scale(this.state.spriteTile.width),
            }
        }

        return {
            height: this.scale(this.props.height * this.context.scale),
            left: this.scale(this.props.x * this.context.scale),
            overflow: 'hidden',
            position: 'absolute',
            top: this.scale(this.props.y),
            transformOrigin: 'top left',
            /*
            transform: `translate(${Math.floor((this.props.x * this.context.scale))}px, ${Math.floor((this.props.y * this.context.scale))}px)`,
            transformOrigin: 'left top',
            */
            width: this.scale(this.props.width),
        };
    }

    private getInnerStyles(): React.CSSProperties {

        if (null != this.state.spriteTile) {
            return {
                height: this.scale(128),
                position: 'absolute',
                transform: `translate(-${this.scale(this.state.spriteTile.x + (this.state.spriteTile.width / 2))}px, -${this.scale(this.state.spriteTile.y)}px)`,
                transformOrigin: 'left top',
                width: this.scale(384)
            };
        }

        return {};
    }

    private scale(scalar: number): number {
        return Math.floor(scalar * this.context.scale);
    }
}