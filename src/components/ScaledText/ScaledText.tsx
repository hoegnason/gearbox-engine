import * as PropTypes from 'prop-types';
import * as React from 'react';

interface IScaledTextProps {
    children: any;
    style?: React.CSSProperties;
}

export class ScaledText extends React.Component<IScaledTextProps, {}> {

    public static contextTypes = {
        scale: PropTypes.number
    }

    public static defaultProps = {
        style: {
            fontSize: 12,
            margin: 0,
            padding: 0
        }
    }

    private renderedScale = 0;

    public shouldComponentUpdate(nextProps: IScaledTextProps, nextState: {}) {
        
        if (this.renderedScale !== this.context.scale) {
            return true;
        }

        return false;
    }

    public render() {

        const children = React.Children.map(this.props.children, child => {

            // If the child has style defined then clone and scale
            if (null != child.props && null != child.props.style) {
                return React.cloneElement(child, {
                    style: this.scaleStyles(child.props.style)
                });
            }

            return child;
        });

        return <div style={this.scaleStyles(this.props.style!)}>{children}</div>;
    }

    private scaleStyles(styles: React.CSSProperties) {
        const returns = {};

        Object.keys(styles).forEach((key: string) => {
            const style = String(styles[key]);

            returns[key] = (style.endsWith('px')) ? (String(this.scale(style.replace('px', ''))) + 'px') : style;
        });
        

        return returns;
}

    private scale(scalar: any): number {
        return Math.floor((Number(scalar) * this.context.scale));
    }
}