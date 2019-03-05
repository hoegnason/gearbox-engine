import * as PropTypes from 'prop-types';
import * as React from 'react';

export interface IGameStateState {
    scrollSpeed?: number;
    gameOver?: boolean;
    ready?: boolean,
    updateState?: (gameState: IGameStateState) => void;
    x?: number;
    paused?: boolean;
    score?: number;
    debug?: boolean;
}

interface IGameStateProps {
    children?: any;
}

export class GameState extends React.Component<IGameStateProps, IGameStateState> {

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
            ready: false,
            score: 0,
            scrollSpeed: -5,
            updateState: updater,
            x: 0,

        }

        this.loop = this.loop.bind(this);
    }

    public componentDidMount() {

        this.context.engine.update = this.loop;
    }

    public loop(): void {
        this.updateState({ x: this.state.x! + this.state.scrollSpeed! });
    }

    // This should completly ignore ConsoleState
    public shouldComponentUpdate(nextProps: IGameStateProps, nextState: IGameStateState): boolean {

        if (!this.initialized) {

            this.initialized = true;
            
            return true;
        }

        if (null != nextProps && null != nextProps.children && nextProps.children.length !== this.childrenLenght) {

            return true;
        }

        return false;
    }

    public updateState(state: IGameStateState) {
        this.setState(state);
    }

    // MovePipes: flutt Pipe og Body component frá App og inn her
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