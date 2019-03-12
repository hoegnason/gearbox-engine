import { GameLoop } from './GameLoop';
import { GameLoopSubscription } from './GameLoopSubscription';

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('game loop', () => {

    let gameLoop: GameLoop;
    let ticks = 0;

    beforeEach(() => {
        ticks = 0;
        gameLoop = new GameLoop();
    });

    test('Ticks sould be greater than 0 after the GameLoop is started', async () => {
        
        expect(ticks).toBe(0);
        
        const subscription: GameLoopSubscription = gameLoop.subscribe(() => {
            ticks = ticks + 1;
        });

        gameLoop.start();
        await timeout(250);
        gameLoop.stop();

        subscription.unsubscribe();

        expect(ticks).toBeGreaterThan(1);
    });

    test('Ticks sould be equal to 0 when the GameLoop is not started', async () => {
        gameLoop.subscribe(() => {
            ticks = ticks + 1;
        });

        expect(ticks).toBe(0);
    });

    test('Expect ticker function not have been called', async () => {
        const ticker = jest.fn(() => {
            ticks = ticks + 1;
        });

        gameLoop.subscribe(ticker);

        expect(ticker).toBeCalledTimes(0);
    });

    test('Stop game loop before staring', async () => {

        gameLoop.stop();
    });
});