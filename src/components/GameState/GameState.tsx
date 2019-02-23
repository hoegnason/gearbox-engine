import * as PropTypes from 'prop-types';
import * as React from 'react';

export interface IGameStateState {
    scrollSpeed?: number;
    gameOver?: boolean;
    updateState?: (gameState: IGameStateState) => void;
    x?: number;
    paused?: boolean;
    score?: number;
    debug?: boolean;
}

interface IGameStateProps {
    children?: any;
}

let lastLoop = 0;

export class GameState extends React.Component<IGameStateProps, IGameStateState> {

    public static contextTypes = {
        engine: PropTypes.object,
        loop: PropTypes.object,
        scale: PropTypes.number,
        width: PropTypes.number
    };

    private childrenLenght = 0;

    constructor(props: any) {
        super(props);

        const updater = this.updateState.bind(this);

        this.state = {
            gameOver: false,
            score: 0,
            scrollSpeed: -5,
            updateState: updater,
            x: 0
        }

        this.loop = this.loop.bind(this);
    }

    public componentDidMount() {

        this.context.engine.update = this.loop;
    }

    public loop(): void {

        // 60 frames per sec!
        const currTime = 1 * Date.now();

        if (lastLoop) {
            lastLoop = 0;
        }

        // if ((lastLoop + 1000 / 60) < currTime) {

        this.updateState({ x: this.state.x! + this.state.scrollSpeed! });

        lastLoop = currTime;
        // }
    }

    // This should completly ignore ConsoleState
    public shouldComponentUpdate(nextProps: IGameStateProps, nextState: IGameStateState): boolean {

        if ((null == nextProps) || (null == nextProps.children)) {

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