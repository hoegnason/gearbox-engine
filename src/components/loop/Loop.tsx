import * as PropTypes from 'prop-types';
import * as React from 'react';
import GameLoop from '../../core/game-loop/GameLoop';

interface ILoopProps {
    children: any;
    style?: object;
}

export class Loop extends React.Component<ILoopProps, {}> {

    public static childContextTypes = {
        loop: PropTypes.object
    };

    private loop: GameLoop;

    private initialized = false;
    private childrenLenght = 0;

    constructor(props: any) {
        super(props);

        this.loop = new GameLoop();
    }

    // This should completly ignore ConsoleState
    public shouldComponentUpdate(nextProps: ILoopProps, nextState: {}): boolean {

        if (!this.initialized) {

            this.initialized = true;
            
            return true;
        }

        if (null != nextProps && null != nextProps.children && nextProps.children.length !== this.childrenLenght) {

            return true;
        }

        return false;
    }

    /*
        loop starts before being passed down to children
    */
    public componentDidMount() {
        this.loop.start();
    }

    public componentWillUnmount() {
        this.loop.stop();
    }

    public getChildContext() {
        return {
            loop: this.loop,
        };
    }

    public render() {
        const defaultStyles: React.CSSProperties = {
            height: '100%',
            margin: '0 auto',
            width: '100%'
        };
        const styles = { ...defaultStyles, ...this.props.style };

        return (
            <div style={styles}>
            { this.props.children }
            </div>
        );
    }
}

export default Loop;