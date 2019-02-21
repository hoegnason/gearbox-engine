import * as PropTypes from 'prop-types';
import * as React from 'react';


export class FlappyUI extends React.Component {

    public static contextTypes = {
        height: PropTypes.number,
        loop: PropTypes.object,
        scale: PropTypes.number,
        width: PropTypes.number
    }

    public render() {

        return <div style={this.getWrappedStyle()}>
            <div style={{ ...this.getTextStyle(), position: 'absolute', transform: `translate(0px, ${this.context.scale * 75}px)`, height: '100%', width: '100%', fontFamily: "'Luckiest Guy', cursive" }}>Game Over!</div>
            {/* <div style={{position: 'absolute', transform: `translate(0px, 1000px)`, height: '100%', width: '100%', fontFamily: "'Luckiest Guy', cursive"}}>Game Over!</div> */}

            <div style={
                {
                    ...this.getTextStyle(), backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: '25px', fontFamily: "'Luckiest Guy', cursive", fontSize: 96 * this.context.scale, left: '50%', padding: `${this.context.scale * 20}px`, position: 'absolute', top: '20%', transform: 'translate(-50%, -50%)',
                    
                /* transform: `translate(${(this.context.width / 2)}px, ${(this.context.height / 2)}px)`, */ /* height: '100%', width: '100%', */  
                }}>Paused</div>
        </div>;
    }

    private getTextStyle(): React.CSSProperties {
        return {
            WebkitTextFillColor: 'white',
            WebkitTextStrokeColor: 'black',
            WebkitTextStrokeWidth: `${2 * this.context.scale}px`
        };
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