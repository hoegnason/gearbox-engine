import * as PropTypes from 'prop-types';
import * as React from 'react';

import { GameLoopSubscription } from 'src/core/game-loop/GameLoopSubscription';
import Body from '../body/Body';
// import { Console } from '../MediaLayer/Console';



let that: Bird;

export class Bird extends React.Component {

    public static displayName = 'Body';

    public static contextTypes = {
        Log: PropTypes.func,
        engine: PropTypes.object,
        loop: PropTypes.object,
        scale: PropTypes.number
    };

    public body: any;

    private subscription: GameLoopSubscription;

    constructor(props: any) {
        super(props);
    }


    public componentDidMount() {

        /*
        this.subscription = (this.context.engine.loop as GameLoop).subscribe(() => {
            if (null != this.body && null != this.body.body && null != this.body.body.x && null != this.body.body.y) {

                this.forceUpdate();
            }
        });
        */

        const SPACE = 32;

        const doc = document.querySelector('body');

        if (null != doc) {
            const processKey = ((event: any) => {

                if (SPACE === event.which) {
                    if (null != this.body && null != this.body.body) {
                        this.body.body.velocity.y = -15;
                        this.context.Log("Jump!!")
                        // (this.context.console as Console).Log('Jump!!');
                    }
                }
            });

            doc.addEventListener('keydown', processKey);
        }

        that = this;
    }

    public componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    public render() {

        return (
            <div>
                <Body ref={b => { this.body = b; }} onUpdate={this.doUpdate} dynamic={true} x={1} y={1} width={25} height={25} velocity={{ x: 5, y: 0 }} colided={false} />
                <div style={{ ...this.getStyles(), backgroundColor: 'red', width: 25 * this.context.scale, height: 25 * this.context.scale }} />
            </div>
        );
    }

    
    private doUpdate(): void {

        // console.log('Updated called!', that); // tslint:disable-line
        

        if (null != that.forceUpdate) {
            that.forceUpdate();
        }
    }

    private getStyles(): React.CSSProperties {

        if (null != this.body && null != this.body.body) {
            return {
                position: 'absolute',
                transform: `translate(${this.body.body.x * this.context.scale}px, ${this.body.body.y * this.context.scale}px)`,
                transformOrigin: 'left top',
            };
        }

        return {};
    }
}

export default Bird;