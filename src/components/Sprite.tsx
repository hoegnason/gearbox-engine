import * as PropTypes from 'prop-types';
import * as React from 'react';

export interface ISpriteState {
    loopID: number;
    tickCount: number;
    finished: boolean;
    currentStep: number;
}

export interface ISpriteProps {
    offset: [number, number],
    onPlayStateChanged: (arg: number) => { /* */ },
    repeat: boolean,
    scale: number,
    src: string,
    state: number,
    steps: [],
    style: React.CSSProperties,
    ticksPerFrame: number,
    tileHeight: number,
    tileWidth: number,
}

export default class Sprite extends React.Component<ISpriteProps, ISpriteState> {

    public static propTypes = {
        offset: PropTypes.array,
        onPlayStateChanged: PropTypes.func,
        repeat: PropTypes.bool,
        scale: PropTypes.number,
        src: PropTypes.string,
        state: PropTypes.number,
        steps: PropTypes.array,
        style: PropTypes.object,
        ticksPerFrame: PropTypes.number,
        tileHeight: PropTypes.number,
        tileWidth: PropTypes.number,
    };

    public static defaultProps = {
        offset: [0, 0],
        onPlayStateChanged: () => { /* */ },
        repeat: true,
        src: '',
        state: 0,
        steps: [],
        ticksPerFrame: 4,
        tileHeight: 64,
        tileWidth: 64,
    };

    public static contextTypes = {
        loop: PropTypes.object,
        scale: PropTypes.number,
    };

    private loopID: number | null;
    private tickCount: number;
    private finished: boolean;

    // tslint:disable-next-line
    private currentStep: number;

    constructor(props: ISpriteProps) {
        super(props);

        this.loopID = null;
        this.tickCount = 0;
        this.finished = false;
        this.currentStep = 0;

        if (this.currentStep) {

            // tslint:disable-next-line            
            console.log(this.currentStep);
        }

        this.setState({currentStep: 0});
    }

    public componentDidMount() {
        this.props.onPlayStateChanged(1);
        const animate = this.animate.bind(this, this.props);
        this.loopID = this.context.loop.subscribe(animate);
    }

    public componentWillReceiveProps(nextProps: ISpriteProps) {
        if (nextProps.state !== this.props.state) {
            this.finished = false;
            this.props.onPlayStateChanged(1);
            this.context.loop.unsubscribe(this.loopID);
            this.tickCount = 0;

            this.setState({
                currentStep: 0,
            }, () => {
                const animate = this.animate.bind(this, nextProps);
                this.loopID = this.context.loop.subscribe(animate);
            });
        }
    }

    public componentWillUnmount() {
        this.context.loop.unsubscribe(this.loopID);
    }

    public animate(props: ISpriteProps) {
        const { repeat, ticksPerFrame, state, steps } = props;

        if (this.tickCount === ticksPerFrame && !this.finished) {
            if (steps[state] !== 0) {
                const currentStep = this.state.currentStep;
                const lastStep = steps[state];
                const nextStep = currentStep === lastStep ? 0 : currentStep + 1;

                this.setState({
                    currentStep: nextStep,
                });

                if (currentStep === lastStep && repeat === false) {
                    this.finished = true;
                    this.props.onPlayStateChanged(0);
                }
            }

            this.tickCount = 0;
        } else {
            this.tickCount++;
        }

    }

    public getImageStyles(): React.CSSProperties {
        const currentStep = this.state.currentStep;
        const { state, tileWidth, tileHeight } = this.props;

        const left = this.props.offset[0] + (currentStep * tileWidth);
        const top = this.props.offset[1] + (state * tileHeight);

        return {
            position: 'absolute',
            transform: `translate(-${left}px, -${top}px)`,
        };
    }

    public render() {
        return (
            <div style={{ ...this.getWrapperStyles(), ...this.props.style }}>
                <img
                    style={this.getImageStyles()}
                    src={this.props.src}
                />
            </div>
        );
    }

    private getWrapperStyles(): React.CSSProperties {
        return {
            height: this.props.tileHeight,
            imageRendering: 'pixelated',
            overflow: 'hidden',
            position: 'relative',
            transform: `scale(${this.props.scale || this.context.scale})`,
            transformOrigin: 'top left',
            width: this.props.tileWidth
        };
    }
}