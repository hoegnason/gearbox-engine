export class GameLoopSubscription {
        
    private unsub?: () => void;
    
    constructor(unsub: () => void) {
        this.unsub = unsub;
    }

    public unsubscribe() {
        if (null != this.unsub) {
            this.unsub();
            this.unsub = undefined;
        }
    }
};