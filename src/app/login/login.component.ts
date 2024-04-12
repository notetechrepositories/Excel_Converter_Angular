import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from '../services/master.service';
import { CompanyModel } from '../model/CompanyModel';
import { LoginService } from './login.service';
import { LoginModel } from '../model/LoginModel';
import Swal from 'sweetalert2';
import { CompanyService } from '../services/company.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  ForgotAndReset=false;
  isLoading=false

  isLoggeddIn: boolean=false;;
  userType:any;
  type: string="password";
  isText: boolean=false;
  eyeIcon: string="fa-eye-slash";

  ResetPin:boolean=false;
  LoginPage:boolean=true;
  SignUpPage:boolean=false;
  resetForm!:FormGroup;
  loginForm !:FormGroup;
  LoginangRegistration:boolean=true;
  signUpForm !: FormGroup;
  company:CompanyModel=new CompanyModel();
  loginModel:LoginModel=new LoginModel();
  errorMessage!:string;
  errorMessageView:boolean=false;
  ForgotAndResetPage:boolean=false;
  accessToken!:string;
  emailorphone!:string;
  password!:string;
  connectionId!:any
  constructor(private fb:FormBuilder,
              private router: Router,
              private service:MasterService, 
              private loginService:LoginService,
              private companyService:CompanyService,
              ){}

  ngOnInit(){
    this.loadData()
    if (this.isLoggeddIn == true) {
      this.router.navigate(['/home']);
    };

    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });

    this.resetForm=this.fb.group({
      password: ['', Validators.required],
      newpassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });

    this.signUpForm = this.fb.group({
      companyname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      password: ['', Validators.required],
      newpassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  loadData() {
    this.isLoggeddIn = localStorage.getItem('accessToken')!=null;
    this.userType = localStorage.getItem('userType');
    this.connectionId=localStorage.getItem('connectionId')
  }

  inputboxClick(event: any) {
    this.errorMessageView = false;
  }

  hideShowPassword(){
    this.isText=!this.isText;
    this.isText?this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
    this.isText?this.type="text":this.type="password";
  }

  forgotPassword(){
    this.LoginangRegistration=false;
    this.router.navigate(['/forgot-and-reset']);

  }

  login(){
    this.LoginPage=false;
    this.SignUpPage=true;
    this.errorMessageView=false;
  }
  signUp(){
    this.SignUpPage=false;
    this.LoginPage=true;
    this.errorMessageView=false;
  }

  onLogin(){
    const formValue = this.loginForm.value;
    this.loginModel = new LoginModel(); 
    this.loginModel.t6_login_pin = formValue.password;
  
    if (formValue.username.includes('@')) {
      this.loginModel.t6_email = formValue.username;
      this.loginModel.t6_mobile_no = ""; 
    } else {
      this.loginModel.t6_mobile_no = formValue.username;
      this.loginModel.t6_email = ""; 
    }
    this.isLoading=true;
  if((this.loginModel.t6_email||this.loginModel.t6_mobile_no)!="" && this.loginModel.t6_login_pin!=""){
    this.loginService.login(this.loginModel).subscribe({
      next: (res) => {
        if(res.status==200){
          this.isLoading=false;
          console.log(res);
          this.accessToken=res.data.access_Token;
          localStorage.setItem('userType',res.data.user);
          localStorage.setItem('accessToken',this.accessToken);
          localStorage.setItem('pinUpdatedStatus',res.data.pin_updated);
          localStorage.setItem('connectionId',res.data.connection_id);

          if(res.data.pin_updated=="y"){
            this.router.navigateByUrl('/home').then(() => {
              window.location.reload();
            });
          }
          else{
           this.LoginangRegistration=false;
           this.ResetPin=true;
          }
        }
        else{
          this.errorMessage=res.message;
          this.isLoading=false;
        }
      }, 
      error: (error) => {
        this.errorMessage=error.error.message;
        this.errorMessageView=true;
        this.isLoading=false;
      }
    });
  }
  else{
    this.errorMessage="username or password required";
    this.errorMessageView=true;
  }
  }
    
  resetpin(){
    const formValue = this.resetForm.value;
    let resetData: any={
      t6_login_pin:formValue.password,
      encrypted_data:"",
    }
  
  if(resetData!=null){
   this.loginService.resetPin(resetData).subscribe({
    next:(res)=>{
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Pin reset Successfully!",
        showConfirmButton: false,
        timer: 3000
      });
      this.ResetPin=false;
      this.LoginangRegistration=true;
      this.ForgotAndReset=false;
    },
    error:(error)=>{
      console.log(error);
      this.service.logout(this.connectionId).subscribe(res=>{
        localStorage.clear();
        this.router.navigate(['/login']).then(() => {
          window.location.reload();
        });
      })
    }
   })
  }
  }


  onSignUpClick(){
    if(this.signUpForm.valid){
      this.isLoading=true;
    this.companyService.companyRegistration(this.company).subscribe({
      next: (res) => {
        if(res.status==200){
          this.isLoading=false;
          this.errorMessageView=false;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Registered Successfully!",
            showConfirmButton: false,
            timer: 3000
          });
          this.signUpForm.reset();
        }
        else{
          this.isLoading=false;
        }
      },
      error: (error) => {
        this.errorMessage=error.error.message;
        this.errorMessageView=true;
        this.isLoading=false;
      }
    });
    }
    else{
      this.validateAllFormFields(this.signUpForm);
    }
  }



  onForgot(){
    this.LoginangRegistration=false;
    this.ForgotAndReset=true;
  }

  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control=formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true})
      }
      else if(control instanceof FormGroup){
        this.validateAllFormFields(control)
      }

    })
  }

  onlyNumbers(event: KeyboardEvent) {
    const charCode = event.which || event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const newPasswordControl = formGroup.get('newpassword');
  
    if (passwordControl && newPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = newPasswordControl.value;
  
      if (password !== confirmPassword) {
        newPasswordControl.setErrors({ mismatch: true });
      } else {
        newPasswordControl.setErrors(null);
      }
    }
  }
  

}
