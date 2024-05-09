import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarActiveSubject = new BehaviorSubject<boolean>(false);
  sidebarActive$ = this.sidebarActiveSubject.asObservable();

  setSidebarActive(active: boolean) {
    this.sidebarActiveSubject.next(active);
  }
}