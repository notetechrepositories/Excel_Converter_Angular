export class CompanyUpdateModel{
    name!: string;
    mobile_no!: string;
    email!: string;
    admin!: string;
    id_m_company!: string;
    company_name!: string;
    address_1!: string;
    address_2!: string;
    country!: string;
    state!: string;
    city!: string;
    zip_pincode!: string;
    access_from_date='';
    access_till_date!: string;
    max_device_login_per_username!: number;
    max_users_allowed!: number;
    source_code_owner!:string
    approved!:string; 
}