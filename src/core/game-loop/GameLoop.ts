import { GameLoopSubscription } from './GameLoopSubscription';

export type GameLoopObserverFunction = () => void;

export class GameLoop {

    private subscribers: GameLoopObserverFunction[];
    private loopID: number | null;
    private isPaused = false;

    constructor() {
        this.subscribers = [];
        this.loopID = null;
        this.loop = this.loop.bind(this);
        this.isPaused = false;
    }

    public start() {
        if (!this.loopID) {
            this.isPaused = false;
            this.loop();
        }
    }

    public stop() {
        if (this.loopID) {
            window.cancelAnimationFrame(Number(this.loopID));
            this.loopID = null;
            this.isPaused = true;
        }
    }

    public subscribe(callback: GameLoopObserverFunction): GameLoopSubscription {
        
        const unsubID = this.subscribers.push(callback);
        
        const unsub = () => {
            this.unsubscribe(unsubID);
        };

        return new GameLoopSubscription(unsub);
    }

    private unsubscribe(id: number): void {
        
        this.subscribers.splice((id - 1), 1);
    }

    /*
        loop calls itself indefinitely by requesting this loop function over and over again
    */
    private loop() {
        this.subscribers.forEach((callback: GameLoopObserverFunction) => {
            callback.call(undefined);
        });

        if (!this.isPaused) {
            this.loopID = window.requestAnimationFrame(this.loop);
        }
    }
}

export default GameLoop;