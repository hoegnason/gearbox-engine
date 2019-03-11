import { IBoxGameStateState } from './BoxGameState';

export const gameState = {
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