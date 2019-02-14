import { GameLoopSubscription } from '../game-loop/GameLoopSubscription';

export type GameLoopObserverFunction = () => void;

export class PhysicsLoop {

    private subscribers: GameLoopObserverFunction[];

    constructor() {
        this.subscribers = [];
        this.loop = this.loop.bind(this);
    }

    public loop() {
        this.subscribers.forEach((callback: GameLoopObserverFunction) => {
            callback.call(undefined);
        });
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
}

export default PhysicsLoop;