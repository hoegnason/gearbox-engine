import * as PropTypes from 'prop-types';
import * as React from 'react';


export class FlappyUI extends React.Component {

    public static contextTypes = {
        dimensions: PropTypes.any,
        loop: PropTypes.object,
        scale: PropTypes.number
    }

    public render() {

        // tslint:disable-next-line
        console.log(this.context);

        return <div style={this.getWrappedStyle()}>
            <div style={{position: 'absolute', transform: `translate(0px, ${this.context.scale * 75}px)`, height: '100%', width: '100%', fontFamily: "'Luckiest Guy', cursive"}}>Game Over!</div>
            {/* <div style={{position: 'absolute', transform: `translate(0px, 1000px)`, height: '100%', width: '100%', fontFamily: "'Luckiest Guy', cursive"}}>Game Over!</div> */}
        </div>;
    }

    private getWrappedStyle(): React.CSSProperties {
        return {
            height: '100%',
            position: 'absolute',
            transform: '0px, 0px',
            width: '100%',
            zIndex: 99999999
        };
    }
}