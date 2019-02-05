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
        if (!this.loopID) {
            window.cancelAnimationFrame(Number(this.loopID));
            this.loopID = null;
        }
    }

    public subscribe(callback: GameLoopObserverFunction): number {
        return this.subscribers.push(callback);
    }

    public unsubscribe(id: number): void {
        if (null == id || isNaN(id) || id < 0) {
            throw new Error(`(Unable to unsubscribe) Illigal argument: ${id} expexted a legal {number}`);
        }
        
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