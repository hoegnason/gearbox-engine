import * as PropTypes from 'prop-types';
import * as React from 'react';
import GameLoop from 'src/core/game-loop/GameLoop';
import { GameLoopSubscription } from 'src/core/game-loop/GameLoopSubscription';

export interface ISpriteProps {
    height: number;
    src: string;
    style?: React.CSSProperties;
    width: number;
    x: number;
    y: number;
    opts?: ISpriteOpts;
    steps?: string[];
    animate?: boolean;
    ticksPerFrame?: number;
    rotate?: number;
}

export interface ISpriteTile {
    height: number;
    width: number;
    x: number;
    y: number;
}

export interface ISpriteState {
    currentStep: number;
    finished: boolean;
    steps: string[];
    animate: boolean;
    tileID: number;
}

export interface ISpriteOpts {
    name: string;
    width: number;
    height: number;
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
        animate: false,
        height: 0,
        opts: {},
        src: PropTypes.string,
        styles: {},
        ticksPerFrame: 60,
        width: 0,
        x: 0,
        y: 0
    };

    public static contextTypes = {
        loop: PropTypes.object,
        scale: PropTypes.number
    };

    private tick = 0;
    private subscription: GameLoopSubscription;
    private stop = false;

    private initialized = false;

    private prevAnimated? = false;
    private prevScale = 0;
    private prevWidth = 0;
    private prevHeight = 0;
    private prevX = 0;
    private prevY = 0;

    public constructor(props: any) {
        super(props);

        this.animate = this.animate.bind(this);

        this.state = {
            animate: false,
            currentStep: 0,
            finished: false,
            steps: [],
            tileID: 0
        };
    }

    public shouldComponentUpdate(nextProps: ISpriteProps, nextState: ISpriteState) {

        if (!this.initialized) {
            this.initialized = true;

            return true;
        }

        if (this.prevScale !== this.context.scale) {

            this.prevScale = this.context.scale;

            return true;
        }

        if (this.prevAnimated === nextProps.animate && this.prevWidth === nextProps.width && this.prevHeight === nextProps.height && this.prevX === nextProps.x && this.prevY === nextProps.y) {

            return false;
        }

        this.prevAnimated = nextProps.animate;
        this.prevWidth = nextProps.width;
        this.prevHeight = nextProps.height;
        this.prevX = nextProps.x;
        this.prevY = nextProps.y;

        return true;
    }

    public componentDidMount() {

        if (null != this.props.animate && this.props.animate) {
            this.subscription = (this.context.loop as GameLoop).subscribe(this.animate);
        }
    }

    public componentWillUnmount() {

        if (null != this.subscription) {
            this.subscription.unsubscribe();
        }
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

            if (this.props.animate) {
                this.setState({ animate: true });
            } else {
                this.setState({ animate: false });
            }
        }
    }

    private animate(): void {

        if (!this.state.finished) {

            if (!this.stop && null != this.props.ticksPerFrame && this.tick === this.props.ticksPerFrame) {
                this.stop = true;

                if (null != this.props.opts && null != this.props.opts['sprite-sheet'] && this.props.steps) {

                    const nextStep = (this.state.currentStep + 1) % this.props.steps.length;

                    this.tick = 0;

                    this.setState({
                        currentStep: nextStep,
                        tileID: nextStep
                    });
                }

                this.tick = 0;
                this.stop = false;
            }

            this.tick = this.tick + 1;
        }
    }

    private getWrapperStyles(): React.CSSProperties {

        const rotate = this.props.rotate ? `rotate(${this.props.rotate}deg)` : '';

        if (null != this.props.opts && null != this.props.opts['sprite-sheet'] && null != this.props.opts['sprite-sheet'][this.state.tileID]) {
            const tile: ISpriteTile = this.props.opts['sprite-sheet'][this.state.tileID];

            return {
                height: this.scale(tile.height),
                left: this.scale(this.props.x),
                overflow: 'hidden',
                position: 'absolute',
                top: this.scale(this.props.y),
                transform: rotate,
                transformOrigin: 'top left',
                width: this.scale(tile.width),
            }
        }

        return {
            height: this.scale(this.props.height),
            left: this.scale(this.props.x),
            overflow: 'hidden',
            position: 'absolute',
            top: this.scale(this.props.y),
            transform: rotate,
            transformOrigin: 'top left',
            width: this.scale(this.props.width),
        };
    }

    private getInnerStyles(): React.CSSProperties {

        if (null != this.props.opts && null != this.props.opts['sprite-sheet'] && null != this.props.opts['sprite-sheet'][this.state.tileID]) {
            const tile: ISpriteTile = this.props.opts['sprite-sheet'][this.state.tileID];

            const height = this.props.opts.height;
            const width = this.props.opts.width;


            return {
                height: this.scale(height),
                position: 'absolute',
                transform: `translate(-${this.scale(tile.x + (tile.width / 2))}px, -${this.scale(tile.y)}px)`,
                transformOrigin: 'left top',
                width: this.scale(width)
            };
        }

        return {};
    }

    private scale(scalar: number): number {
        return Math.floor(scalar * this.context.scale);
    }
}