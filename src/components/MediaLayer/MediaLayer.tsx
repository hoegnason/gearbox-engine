import * as PropTypes from 'prop-types';
import * as React from 'react';

interface IMediaLayerProps {
    children: any;
    style?: any;
    dimensions?: [number, number];
    height?: number;
    width?: number;
}

interface IMediaState {
    children: any;
    dimensions: [number, number];
}

export class MediaLayer extends React.Component<IMediaLayerProps, IMediaState> {

    public static defaultProps = {
        height: 576,
        width: 1024
    };

    public static contextTypes = {
        loop: PropTypes.object
    }

    public static childContextTypes = {
        loop: PropTypes.object,
        scale: PropTypes.number      
    };

    private container: any;


    constructor(props: IMediaLayerProps) {
        super(props);

        this.container = null;

        this.state = {
            children: {},
            dimensions: [0, 0],
        };

        this.setDimensions = this.setDimensions.bind(this);
    }

    public componentDidMount() {
        window.addEventListener('resize', this.setDimensions);
        this.setDimensions();
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.setDimensions);
    }

    public getChildContext() {
        return {
            loop: this.context.loop,
            scale: this.getScale().scale
        };
    }


    public render() {
        return (
            <div style={this.getWrapperStyles()} ref={(c) => { this.container = c; }}>
                <div style={{ ...this.getInnerStyles(), ...this.props.style }}>
                    {this.props.children}
                </div>
            </div>
        );
    }


    public getScale() {
        const [vwidth, vheight] = this.state.dimensions;
        const { height, width } = this.props;

        if (null != height && null != width) {
            let targetWidth;
            let targetHeight;
            let targetScale;

            if (height / width > vheight / vwidth) {
                targetHeight = vheight;
                targetWidth = targetHeight * width / height;
                targetScale = vheight / height;
            } else {
                targetWidth = vwidth;
                targetHeight = targetWidth * height / width;
                targetScale = vwidth / width;
            }

            if (!this.container) {
                return {
                    height,
                    scale: 1,
                    width,
                };
            } else {
                return {
                    height: targetHeight,
                    scale: targetScale,
                    width: targetWidth,
                };
            }
        } else {
            return {
                height: 0,
                scale: 1,
                width: 1
            }
        }
    }

    private getWrapperStyles(): React.CSSProperties {
        return {
            height: '100%',
            position: 'relative',
            width: '100%'
        };
    }

    private setDimensions() {
        this.setState({
            dimensions: [
                this.container.offsetWidth,
                this.container.offsetHeight,
            ],
        });
    }

    private getInnerStyles() {
        const scale = this.getScale();
        const xOffset = Math.floor((this.state.dimensions[0] - scale.width) / 2);
        const yOffset = Math.floor((this.state.dimensions[1] - scale.height) / 2);

        return {
            height: Math.floor(scale.height),
            overflow: 'hidden',
            position: 'absolute',
            transform: `translate(${xOffset}px, ${yOffset}px)`,
            width: Math.floor(scale.width)
        };
    }
}

export default MediaLayer;