import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

export const keyboardObs =
    fromEvent(document, 'keydown')
        .pipe(map((event: KeyboardEvent) => (null != event && null != event.which) ? event.which : null ));