import * as PropTypes from 'prop-types';
import * as React from 'react';
import GameLoop from '../core/GameLoop';

interface ILoopProps {
    children: any;
    style?: object;
}

export class Loop extends React.Component<ILoopProps, {}> {

    public static childContextTypes = {
        loop: PropTypes.object
    };

    private loop: GameLoop;

    constructor(props: any) {
        super(props);

        this.loop = new GameLoop();
    }

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
        const defaultStyles = {
            height: '100%',
            width: '100%',
        };
        const styles = { ...defaultStyles, ...this.props.style };

        return (
            <div style={styles}>
            { this.props.children }
            </div>
        );
    }
}

export default GameLoop;