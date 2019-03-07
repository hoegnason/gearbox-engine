import { IBoxGameStateState } from './BoxGameState';

export const initGameState = {
    gameOver: false,
    paused: false,
    ready: false,
    score: 0,
    updateState: (nextGameState: IBoxGameStateState) => {
        if (nextGameState) {
            nextGameState = nextGameState;
        }
    }
};