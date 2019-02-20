import { fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IKeyboardOpts {
    touchKey?: string;
}

const touchObs = (key: string) => fromEvent(document, 'touchstart').pipe(map((event: TouchEvent) => key));
const keyboardObs = fromEvent(document, 'keydown').pipe(map((event: KeyboardEvent) => event.key));

export const createKeyboardObservable = (opts?: IKeyboardOpts): Observable<string> => {

    if (null != opts && null != opts.touchKey &&  (typeof opts.touchKey === 'string')) {
        return merge(keyboardObs, touchObs(opts.touchKey));
    }

    return keyboardObs;
}
