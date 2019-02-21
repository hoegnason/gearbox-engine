import { Subscription } from 'rxjs';
import { createKeyboardObservable } from './keyboardSubject';

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('KeyboardSubject', async () => {

    let obs: Subscription;

    let observations: number;
    let which: string;

    beforeEach(() => {
        observations = 0;
        which = '';
    });

    afterEach(() => {
        if (null != obs) {
            obs.unsubscribe();
        }
    });

    const createAndDispatchKeyboardEvent = (key: string) => {
        const keyboardEvent = new KeyboardEvent('keydown', {key});
        document.dispatchEvent(keyboardEvent);
    };

    it('Should return a keyboardSubject', async () => {

        createAndDispatchKeyboardEvent(' ');

        await timeout(250);

        obs = createKeyboardObservable().subscribe((key: string) => {
            observations = observations + 1;
            which = key;
        });

        expect(observations).toBe(0);
        expect(which).toBe('');

        createAndDispatchKeyboardEvent(' ');
        
        await timeout(250);

        expect(observations).toBe(1);
        expect(which).toBe(' ');
    });

    it('Should return a keyboardSubject with SPACE as touchKey', async () => {

        const touchEvent = new TouchEvent('touchstart');

        document.dispatchEvent(touchEvent);

        await timeout(250);

        obs = createKeyboardObservable({touchKey: ' '}).subscribe((key: string) => {
            observations = observations + 1;
            which = key;
        });

        expect(observations).toBe(0);
        expect(which).toBe('');

        document.dispatchEvent(touchEvent);

        await timeout(250);

        expect(observations).toBe(1);
        expect(which).toBe(' ');
    });

});