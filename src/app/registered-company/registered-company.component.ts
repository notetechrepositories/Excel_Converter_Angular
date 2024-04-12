
import { Component } from '@angular/core';
import { CompanyDetailsModel } from '../model/CompanyDetailsModel';
import { CompanyService } from '../services/company.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { CompanyUpdateModel } from '../model/CompanyUpdateModel';

@Component({
  selector: 'app-registered-company',
  templateUrl: './registered-company.component.html',
  styleUrls: ['./registered-company.component.css']
})
export class RegisteredCompanyComponent {

  companyDetails:CompanyDetailsModel[]=[];
  companynew:CompanyUpdateModel=new CompanyUpdateModel();
  PopUpVisible:boolean=false;
  PopUpVisible2:boolean=false;
  companyCount!:number;


  constructor(private companyService:CompanyService,
              private datePipe: DatePipe){}

  ngOnInit() { 
    this.getCompany();
    
  }

  inputboxClick(event: any) {
    
  }

  onlyNumbers(event: KeyboardEvent) {
    const charCode = event.which || event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  getCompany(){
    this.companyService.getAllCompany().subscribe(res => {
      const companies = res.data;
      const approvedCompanies = companies.filter((companys: { t5_approved: string; }) => companys.t5_approved === "y");
      this.companyDetails.push(...approvedCompanies);
      this.companyCount=this.companyDetails.length;
      this.companyDetails=[...this.companyDetails];
    });
  }

  onEdit(data:any){
    this.PopUpVisible=true;
    var newObj=this.companyDetails.filter(companys => companys.id_t5_m_company === data);
    this.companynew.id_m_company=newObj[0].id_t5_m_company; 
    this.companynew.company_name=newObj[0].t5_company_name;    
    this.companynew.email=newObj[0].t5_email;
    this.companynew.mobile_no=newObj[0].t5_mobile_no;
    this.companynew.address_1=newObj[0].t5_address_1;
    this.companynew.address_2=newObj[0].t5_address_2;
    this.companynew.country=newObj[0].t5_country;
    this.companynew.state=newObj[0].t5_state;
    this.companynew.city=newObj[0].t5_city;
    this.companynew.zip_pincode=newObj[0].t5_zip_pincode;
    this.companynew.access_from_date=newObj[0].t5_access_from_date;
    this.companynew.access_till_date=newObj[0].t5_access_till_date;
    this.companynew.max_device_login_per_username=newObj[0].t5_max_device_login_per_username;
    this.companynew.max_users_allowed=newObj[0].t5_max_users_allowed;
    let fromDate=this.datePipe.transform(this.companynew.access_from_date, 'yyyy-MM-dd')
    let toDate=this.datePipe.transform(this.companynew.access_till_date, 'yyyy-MM-dd')
    this.companynew.access_from_date=fromDate as string;
    this.companynew.access_till_date=toDate as string; 
  }

  updateCompanyByNotetech(){
    let updateData:any={
      id_t5_m_company: this.companynew.id_m_company,
      t5_company_name: this.companynew.company_name,
      t5_address_1: this.companynew.address_1,
      t5_address_2: this.companynew.address_2,
      t5_country: this.companynew.country,
      t5_state: this.companynew.state,
      t5_city: this.companynew.city,
      t5_zip_pincode: this.companynew.zip_pincode,
      t5_mobile_no: this.companynew.mobile_no,
      t5_email: this.companynew.email,
      t5_access_till_date: this.companynew.access_till_date,
      t5_max_device_login_per_username: this.companynew.max_device_login_per_username,
      t5_max_users_allowed: this.companynew.max_users_allowed
    }

      this.companyService.updateCompanyByAdmin(updateData).subscribe({
        next:(res)=>{
         if(res.status==200){
          this.PopUpVisible=false;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Updated Successfully!",
            showConfirmButton: false,
            timer: 3000
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
         }
        },
        error:(error)=>{
          console.log(error);
        }
      })
  }

  deleteCompanyById(id:number){
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.companyService.deleteCompanyById(id).subscribe({
          next:(res)=>{
            console.log(res);
            
          },
          error:(error)=>{
            console.log(error);
          }
        })
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          showConfirmButton: false
        });
      }
      window.location.reload();
    });
  }
}
