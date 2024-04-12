import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotAndResetService } from './forgot-and-reset.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable, map, takeWhile, tap, timer } from 'rxjs';

@Component({
  selector: 'app-forgot-and-reset',
  templateUrl: './forgot-and-reset.component.html',
  styleUrls: ['./forgot-and-reset.component.css']
})
export class ForgotAndResetComponent implements OnInit{
 ForgotPassword:boolean=true;
 VerifyOTP:boolean=false;
 ResetPassword:boolean=false;
 errorMessageView:boolean=false;
 errorMessage!:string;
 isLoading:boolean=false;
 isVerifyDisabled:boolean=false;
 showResend:boolean=false;
 formValue:any

 forgotForm !:FormGroup;
 encryptedData!:string;


 otp:any;
 otp1:string='';
 otp2:string='';
 otp3:string='';
 otp4:string='';
 iserror:boolean=false;

type: string="password";
isText: boolean=false;
eyeIcon: string="fa-eye-slash";
resetForm!:FormGroup;

remainingTime!: Observable<number>;
private readonly otpTimeInSeconds = 60; // Set your OTP duration here
private readonly intervalInMilliseconds = 1000;

constructor(private forgotResetService:ForgotAndResetService,
            private fb:FormBuilder,
            private router:Router){}
  ngOnInit(): void {

    this.forgotForm = this.fb.group({
      emailorphone:['',Validators.required],
    });

    this.resetForm=this.fb.group({
      password: ['', Validators.required],
      newpassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  startOtpTimer(): void {
    this.remainingTime = timer(0, this.intervalInMilliseconds).pipe(
      takeWhile((elapsedIntervals) => elapsedIntervals <= this.otpTimeInSeconds),
      map((elapsedIntervals) => this.otpTimeInSeconds - elapsedIntervals),
      tap((remaining:number) => {
        if (remaining === 0) {
          // When countdown ends, disable the "Verify" button and show the "Resend OTP" button.
          this.isVerifyDisabled = true;
          this.showResend = true;
        }
      })
    );
    console.log( this.remainingTime);
    
  }

  hideShowPassword(){
    this.isText=!this.isText;
    this.isText?this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
    this.isText?this.type="text":this.type="password";
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
  
  inputboxClick(event: any) {
    this.errorMessageView=false;
  }

// forgot section

onforgotpassword(){
  this.formValue=this.forgotForm.value;
  const formValue = this.forgotForm.value;
 console.log(formValue);
 
  let forgotData: any = {};

  if (formValue.emailorphone.includes('@')) {
    forgotData.t6_email = formValue.emailorphone;
  } else {
    forgotData.t6_mobile_no = formValue.emailorphone;
  }
  this.isLoading=true;
  if(forgotData!=null){
    this.forgotResetService.forgotPassword(forgotData).subscribe({
      next: (res) => {
        if(res.status=200){
          this.isLoading=false;
          this.encryptedData=res.data.encrypted_data;    
          this.ForgotPassword=false;
          this.VerifyOTP=true;
          this.startOtpTimer();
        }
      },
      error: (error) => {
        this.errorMessage=error.error.message;
        this.errorMessageView=true;
        this.isLoading=false;
      }
    });
  }

}

backToLogin(){
  this.router.navigate(['/login']);
  window.location.reload();
}

onResendOTP(){
  let resendData: any = {};
  if (this.formValue.emailorphone.includes('@')) {
    resendData.t6_email = this.formValue.emailorphone;
  } else {
    resendData.t6_mobile_no = this.formValue.emailorphone;
  }
  this.isLoading=true;
  if(resendData!=null){
    this.forgotResetService.forgotPassword(resendData).subscribe({
      next: (res) => {
        if(res.status=200){
          this.isLoading=false;
          this.encryptedData=res.data.encrypted_data;    
          this.isVerifyDisabled = false;
          this.showResend = false;
          this.startOtpTimer();
        }
      },
      error: (error) => {
        this.errorMessage=error.error.message;
        this.errorMessageView=true;
        this.isLoading=false;
      }
    });
  }
}


// OTP section

 onOtpInput(event: any, firstInput?: HTMLInputElement): void {
  const input = event.target;
  if (input.value.length === 1 && firstInput) {
    firstInput.focus();
  } else if (!firstInput && input.value.length === 1) {
    // this.validate();
  }
  else {
    console.log("error");
  }
  if (event.key === "Backspace" && event.target.previousElementSibling) {
    const previous = event.target.previousElementSibling as HTMLInputElement;
    // this.iserror = false;
    if (previous) {
      previous.focus();
    }
  }
}

onVerifyOTP(){
  this.otp = `${this.otp1}${this.otp2}${this.otp3}${this.otp4}`;
  let OTPVerificationData: any = {
    encrypted_data: this.encryptedData,
    otp_pin: this.otp
  };
  this.isLoading=true;
  if(OTPVerificationData!=null){
    this.forgotResetService.OtpVerification(OTPVerificationData).subscribe({
      next: (res) => {
        console.log(res);
        if(res.status=200){
          this.isLoading=false;
          this.encryptedData=res.data.encrypted_data;
          this.ForgotPassword=false;
          this.VerifyOTP=false;
          this.ResetPassword=true;
        }
      },
      error: (error) => {
        console.log(error);
        this.isLoading=false;
        this.errorMessage=error.error.message;
        this.errorMessageView=true;
      }
    });
  }
}


// Reset Password

resetPassword(){
  const formValue = this.resetForm.value;
  let resetData: any={
    t6_login_pin:formValue.password,
    encrypted_data:this.encryptedData
  }
  this.isLoading=true;
if(resetData!=null && formValue.password==formValue.newpassword){
 this.forgotResetService.resetPassword(resetData).subscribe({
  next:(res)=>{
    this.isLoading=false;
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Pin reset Successfully!",
      showConfirmButton: false,
      timer: 3000
    });
    console.log(res);
    this.router.navigate(['/login']);
    window.location.reload();
    this .ForgotPassword=false;
    this.ResetPassword=false;
    this.VerifyOTP=false;
  },
  error:(error)=>{
    console.log(error);
    this.isLoading=false;
  }
 })
}
}

}
