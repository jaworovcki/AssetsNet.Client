import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {
  private spinnerCounter = new BehaviorSubject<number>(0);
  spinnerCounter$ = this.spinnerCounter.asObservable();
  requestCount: number = 0;
  show() {
    this.spinnerCounter.next(this.spinnerCounter.value + 1);
  }

  hide() {
    this.spinnerCounter.next(this.spinnerCounter.value - 1);
  }
}
