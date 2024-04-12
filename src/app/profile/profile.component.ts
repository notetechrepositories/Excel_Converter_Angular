import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { MasterService } from '../services/master.service';
import { CompanyService } from '../services/company.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyDetailsModel } from '../model/CompanyDetailsModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

profileDetails:CompanyDetailsModel=new CompanyDetailsModel() ;
errorMessage!:string;
userUpdateForm!:FormGroup;
companyUpdateForm!:FormGroup
userType!:any;

Company_UserProfile_View:boolean=false;
Company_AdminProfile_View:boolean=false;
AdminProfile_View:boolean=false;

UserUpdateProfileVisible:boolean=false;
CompanyUpdateProfileVisible:boolean=false;
errorMessageView:boolean=false;

constructor(private service:MasterService,
            private fb:FormBuilder,
            private userService:UserService,
            private companyService:CompanyService
            ){}

ngOnInit(){
  this.getAuthorizeUserDetails();
  this.forms();
  this.loadData();

}

onlyNumbers(event: KeyboardEvent) {
  const charCode = event.which || event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    event.preventDefault();
  }
}
inputboxClick(event: any) {
  this.errorMessageView=false;
}

loadData(){
  this.userType=localStorage.getItem('userType');
  if(this.userType=="company_user"){
    this.Company_UserProfile_View=true;
    this.Company_AdminProfile_View=false;
    this.AdminProfile_View=false;
  }
  else if(this.userType=="company_admin"){
    this.Company_UserProfile_View=false;
    this.Company_AdminProfile_View=true;
    this.AdminProfile_View=false;
  }
  else{
    this.Company_UserProfile_View=false;
    this.Company_AdminProfile_View=false;
    this.AdminProfile_View=true;
  }

}

forms(){

  this.userUpdateForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', Validators.required],
    adminPrivilege: ['', Validators.required]
  });

  this.companyUpdateForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', Validators.required],
    address: ['', Validators.required],
    address2: [''],
    city: ['', Validators.required],
    country: ['', Validators.required],
    state: ['', Validators.required],
    zipcode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]]
  });

}

  getAuthorizeUserDetails(){
    this.service.getAuthorizedUserDetails().subscribe({
      next:(res)=>{
        this.profileDetails=res.data;
        console.log(this.profileDetails);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  onEditProfile(){
    if(this.userType=="company_user"){
      this.UserUpdateProfileVisible=true;
      this.CompanyUpdateProfileVisible=false;
    }
    else if(this.userType=="company_admin"){
      this.UserUpdateProfileVisible=false;
      this.CompanyUpdateProfileVisible=true;
    }
    else{
    
    }
  
    

  }


  onUpdateUserProfile(){
    let userUpdateData:any={
      t6_name: this.profileDetails.t6_name,
      t6_mobile_no: this.profileDetails.t6_mobile_no,
      t6_email: this.profileDetails.t6_email
    }
    console.log(userUpdateData);
    this.userService.updateUserProfileByUser(userUpdateData).subscribe({
      next:(res)=>{
        this.UserUpdateProfileVisible=false;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Updated Successfully!",
          showConfirmButton: false,
          timer: 3000
        });
      },
      error:(error)=>{
        console.log(error );
        this.errorMessageView=false;
        this.errorMessage=error.message;
      }
    })
  }

  onUpdateCompanyProfile(){
    let companyUpdateData:any={
      t5_company_name: this.profileDetails.t5_company_name,
      t5_address_1: this.profileDetails.t5_address_1,
      t5_address_2: this.profileDetails.t5_address_2,
      t5_country: this.profileDetails.t5_country,
      t5_state: this.profileDetails.t5_state,
      t5_city: this.profileDetails.t5_city,
      t5_zip_pincode: this.profileDetails.t5_zip_pincode,
      t5_mobile_no: this.profileDetails.t5_mobile_no,
      t5_email: this.profileDetails.t5_email,
    }
    console.log(companyUpdateData);
    this.companyService.updateCompanyProfileByCompany(companyUpdateData).subscribe({
      next:(res)=>{
        this.CompanyUpdateProfileVisible=false;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Updated Successfully!",
          showConfirmButton: false,
          timer: 3000
        });
      },
      error:(error)=>{
        console.log(error );
        this.errorMessageView=false;
        this.errorMessage=error.message;
      }
    })
  }

}
