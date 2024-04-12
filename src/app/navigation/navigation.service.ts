import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private navigationViewState = new BehaviorSubject<boolean>(true); // Assuming true is the initial state

  constructor() {}

  setNavigationViewState(state: boolean) {
    this.navigationViewState.next(state);
  }

  getNavigationViewState() {
    return this.navigationViewState.asObservable();
  }
}
