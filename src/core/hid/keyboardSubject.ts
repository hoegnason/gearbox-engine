import { fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

const SPACE = 32;

const touchObs = fromEvent(document, 'touchstart').pipe(map((event: TouchEvent) => SPACE));

export const keyboardObs =
    merge(
        fromEvent(document, 'keydown').pipe(map((event: KeyboardEvent) => (null != event && null != event.which) ? event.which : null )),
        touchObs);
