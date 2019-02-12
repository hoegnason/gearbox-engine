import { GameLoopSubscription } from './GameLoopSubscription';

export type GameLoopObserverFunction = () => void;

export class GameLoop {

    private subscribers: GameLoopObserverFunction[];
    private loopID: number | null;

    constructor() {
        this.subscribers = [];
        this.loopID = null;
        this.loop = this.loop.bind(this);
    }

    public start() {
        if (!this.loopID) {
            this.loop();
        }
    }

    public stop() {
        if (this.loopID) {
            window.cancelAnimationFrame(Number(this.loopID));
            this.loopID = null;
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

        /* TODO: Add some checks!
         * 
         * if (null == id || isNaN(id) || id < 0) {
         *     throw new Error(`(Unable to unsubscribe) Illigal argument: ${id} expexted a legal {number}`);
         * }
         */
        
        this.subscribers.splice((id - 1), 1);
    }

    private loop() {
        this.subscribers.forEach((callback: GameLoopObserverFunction) => {
            callback.call(undefined);
        });

        this.loopID = window.requestAnimationFrame(this.loop);
    }
}

export default GameLoop;