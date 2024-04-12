import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, timer } from 'rxjs';
import { switchMap, startWith, tap } from 'rxjs/operators';
import { NavigationComponent } from '../navigation/navigation.component';
import { NavigationService } from '../navigation/navigation.service';
import { MasterService } from './master.service';

@Injectable({
  providedIn: 'root'
})
export class IdleDetectorService {

  private timeoutMinutes = 1;
  private idleTimer$: Observable<number> | undefined;
  private userActions$ = new Subject<void>();
  connectionId!:any;

  constructor(private router: Router,
              private navigationService: NavigationService,
              private service:MasterService) {}

  ngOnInit(){
    this.connectionId=localStorage.getItem('connectionId');
  }

  initializeIdleTimer() {
    this.idleTimer$ = this.userActions$.pipe(
      startWith(0),
      switchMap(() => timer(this.timeoutMinutes * 60 * 1000)),
      tap(() => {
        this.logout();
      })
    );
    this.idleTimer$.subscribe();
  }

  userAction() {
    this.userActions$.next();
  }

  logout() {
    this.service.logout(this.connectionId).subscribe(res=>{
      localStorage.clear();
      this.navigationService.setNavigationViewState(false);
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
      });
    }
}
