import { Component,HostListener } from '@angular/core'; 
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { MasterService } from './services/master.service';
import { DbConfig } from './model/DbConfig';
import { Router } from '@angular/router';
import { IdleDetectorService } from './services/idle-detector.service';
import { NavigationService } from './navigation/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class AppComponent {
  title: any;
  isLoggedIn=false;
  // private sessionTimeoutMinutes = 50;

  accessToken!:any;
  pinUpdatedStatus!:any;
  connectionId!:any;

  constructor(private router: Router,
              private service: MasterService,
              private navigationService:NavigationService,
              private idleDetector: IdleDetectorService)
                {
                  this.idleDetector.initializeIdleTimer();
                }


@HostListener('document:mousemove')
@HostListener('document:click')
@HostListener('document:keypress')
    resetTimer() {
      this.idleDetector.userAction();
    }   
    
    
  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.accessToken=localStorage.getItem('accessToken');
    this.pinUpdatedStatus=localStorage.getItem('pinUpdatedStatus');
    this.connectionId=localStorage.getItem('connectionId');
    if(this.accessToken != null && this.pinUpdatedStatus =="y" || this.connectionId!=null){
      this.isLoggedIn=true;

    }
    else{
      this.isLoggedIn=false;
      localStorage.clear();
      this.router.navigate(['/login']);
      // this.logoutUser();
    }
 }

//  startSessionTimer() {
//   const timeoutDuration = this.sessionTimeoutMinutes * 60 * 1000; // Convert minutes to milliseconds
//   setTimeout(() => {
//     // Logic to run after timeout, e.g., logout the user
//     this.logoutUser();
//   }, timeoutDuration);
// }

// logoutUser(){
//   if(this.isLoggedIn){
//     this.service.logout(this.connectionId).subscribe(res=>{
//       localStorage.clear();
//       this.navigationService.setNavigationViewState(false);
//       this.router.navigate(['/login']).then(() => {
//         window.location.reload();
//       });
//       });
//     }
//   }
}
