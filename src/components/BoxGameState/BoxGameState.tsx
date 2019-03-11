import * as PropTypes from 'prop-types';
import * as React from 'react';

export interface IBoxGameStateState {
    gameOver?: boolean;
    ready?: boolean,
    updateState?: (gameState: IBoxGameStateState) => void;
    paused?: boolean;
    score?: number;
}

interface IBoxGameStateProps {
    children?: any;
}

export class GameState extends React.Component<IBoxGameStateProps, IBoxGameStateState> {

    public static contextTypes = {
        Log: PropTypes.func,
        engine: PropTypes.object,       
        height: PropTypes.number,
        loop: PropTypes.object,
        scale: PropTypes.number,
        width: PropTypes.number
    };

    private childrenLenght = 0;
    private initialized = false;

    constructor(props: any) {
        super(props);

        const updater = this.updateState.bind(this);

        this.state = {
            gameOver: false,
            paused: false,
            ready: false,
            score: 0,
            updateState: updater
        }

        this.loop = this.loop.bind(this);
    }

    
    public componentDidMount() {

        this.context.engine.update = this.loop;
    }

    public loop(): void {
        this.updateState({ ready: false });
    }

    // This should completly ignore ConsoleState
    public shouldComponentUpdate(nextProps: IBoxGameStateProps, nextState: IBoxGameStateState): boolean {

        if (!this.initialized) {

            this.initialized = true;
            
            return true;
        }

        if (null != nextProps && null != nextProps.children && nextProps.children.length !== this.childrenLenght) {

            return true;
        }

        return false;
    }

    public updateState(state: IBoxGameStateState) {
        this.setState(state);
    }

    public render() {

        const children = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                gameState: this.state
            });
        });

        return (
            <div>
                {children}
            </div>
        )
    }
}

export default GameState;