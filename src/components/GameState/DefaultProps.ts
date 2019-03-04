import { IGameStateState } from './GameState';

export const gameState = {
    debug: false,
    gameOver: false,
    paused: false,
    ready: false,
    score: 0,
    scrollSpeed: 0,
    updateState: (nextGameState: IGameStateState) => {
        if (nextGameState) {
            nextGameState = nextGameState;
        }
    },
    x: 0
};