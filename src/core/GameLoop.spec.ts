import { GameLoop } from './GameLoop';

describe('game loop', () => {

    let gameLoop: GameLoop;
    let ticks = 0;

    beforeEach(() => {
        ticks = 0;
        gameLoop = new GameLoop();
    });

    test('Ticks sould be greater than 0 after the GameLoop is started', async () => {
        const subscription = gameLoop.subscribe(() => {
            ticks = ticks + 1;
        });

        gameLoop.start();
        gameLoop.stop();

        gameLoop.unsubscribe(subscription);

        expect(ticks).toBeGreaterThan(0);
    });

    test('Ticks sould be equal to 0 when the GameLoop is not started', async () => {
        gameLoop.subscribe(() => {
            ticks = ticks + 1;
        });

        expect(ticks).toBe(0);
    });

    test('Expect ticker function to be called once', async () => {
        const ticker = jest.fn(() => {
            ticks = ticks + 1;
        });

        gameLoop.subscribe(ticker);

        gameLoop.start();
        gameLoop.stop();

        expect(ticker).toBeCalledTimes(1);
    });

    test('Expect ticker function not have been called', async () => {
        const ticker = jest.fn(() => {
            ticks = ticks + 1;
        });

        gameLoop.subscribe(ticker);

        expect(ticker).toBeCalledTimes(0);
    });

    test('Stop game loop before staring', async () => {


        // Covers this section in stop()

        // if (!this.loopID) {
        //     window.cancelAnimationFrame(Number(this.loopID));
        //     this.loopID = null;
        // }

        gameLoop.stop();
    });

    test('Should throw error when unsubing without a valid id', async () => {

        expect(() => {
            gameLoop.unsubscribe(-1);
        }).toThrow();
    });

});