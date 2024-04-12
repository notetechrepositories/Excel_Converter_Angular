import { Component,EventEmitter, Input, Output, } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserDetailsModel } from '../model/UserDetailsModel';
import { CompanyService } from '../services/company.service';
import { forkJoin, from } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-registered-user',
  templateUrl: './registered-user.component.html',
  styleUrls: ['./registered-user.component.css']
})
export class RegisteredUserComponent {

  userDetails: UserDetailsModel[] = [];
  userCount!:number;
  statuses: any;
  errorMessage!:string;
  successMessage!:string;



  constructor(private userService:UserService,
              private companyService:CompanyService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,){}

  ngOnInit() {
    this.getUsers(); 

    
    this.statuses = [
      { label: 'Yes', value: 'y' },
      { label: 'No', value: 'n' }
  ];
  }

  getUsers(){
    this.userService.getAllUsers().subscribe(res=>{
      this.userDetails=res.data;
      this.userCount=this.userDetails.length;
      console.log(this.userDetails);
      
    });
  }

  updateUserPrivilege(id:number,event:any){
    console.log(id,event.value);
    
    let updateData:any={
        id_t6_company_users: id,
        t6_admin:event.value
      }
      this.userService.updateUserPrivilagebyCompany(updateData).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.status==400){
            this.errorMessage=res.message;
            this.messageService.add({ severity: 'error', summary: 'Unable to Update!', detail: this.errorMessage, life: 5000 });
            this.getUsers();
          }
          else{
            this.successMessage=res.message;
            this.messageService.add({ severity: 'success', summary: 'Successfully Updated!', detail:  this.successMessage, life: 3000 });
          }
        },
        error:(error)=>{
          this.errorMessage=error.error.message;
            this.messageService.add({ severity: 'error', summary: 'Unable to Update!', detail: this.errorMessage, life: 5000 });
        }
      })
    }



}
