import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TimeoutService {
  timeout(fn): Observable<{}> {
    return new Observable(observer => {
      setTimeout(() => {
        fn();
        observer.next();
        observer.complete();
      });
    });
  }
}
