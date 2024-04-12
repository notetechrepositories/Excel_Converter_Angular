import { Component } from '@angular/core';
import { MasterService } from '../services/master.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { DbConfig } from '../model/DbConfig';
import { DataRetrieveModel } from '../model/DataRetrieveModel';
import { DataUpdateModel } from '../model/DataUpdateModel';
import Swal from 'sweetalert2';
import { Table } from 'primeng/table';
import { ViewChild } from '@angular/core';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLoggedIn :any;

  homepage = false;
  adminPage=false;
  tutorialPage = false;
  verifyMessage = false;
  invalidMessage = false;
  verifyButton = true;
  errorLabel = false;
  warningLabel = false;
  warningLabel2 = false;
  openPopup = false;
  errorListBox = false;
  configurationForm = false;
  configurationFormCover = false;
  loadingScreen = false;
  successScreen = false;
  convertErrorScreen = false;
  CreateRetrieveUpdateBtn = false;
  isBlinking = false;
  isLoading = false;
  visible: boolean = false;
  AddTablevisible:boolean=false;
  AddFieldvisible:boolean=false;
  Errorvisible: boolean = false;
  RetiveDataVisible: boolean = false;
  RetiveAllDataVisible:boolean= false;
  UpdateDataVisible: boolean = false;
  configDialog: boolean = false;
  submitted: boolean = false;
  wentwrongerror:boolean=true;

  selectedFile: File | undefined;
  verifyErrorMessage: any[] = [];
  convertErrorMessage: any[] = [];
  dataConfig_list: any = [];
  dataConfig: any = [];
  excel: any[] = [];
  excelList !: DbConfig;
  hostname: any[] = [];
  portname: any[] = [];
  databasename: any[] = [];
  database: any[] = [];
  databaseNameList: any[] = [];
  retrieveDataDatabaseList: any[] = [];
  finalList: any[] = [];
  tableName: string[] = [];
  dbTableList: any = [];
  selectedTableName: any[] = [];
  selectedConfiguration!: any[] | null;
  selectedDbAndTableList!: any[] | null;

  host: string = '';   
  port: string = '';
  errorMessage: string = "";
  responseMessage: string = "";
  selectedDatabaseName!: string;
  excels: any;
  updateDatabaseList: any;
  dialogBackgroundColor: string = '#dd4444';
  excelData = new DbConfig();
  dataRetrieve = new DataRetrieveModel();
  updateDataObject: DataUpdateModel = new DataUpdateModel();
  @ViewChild('dt') dataTable !: Table;
  userType!: any;


  constructor(private service: MasterService, 
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router) { }


  ngOnInit() {
    this.loadData()
    
   
    console.log(this.userType);
    if(this.userType=="notetech"){
      this.homepage=false;
      this.adminPage=true;
    }
    else{
      this.homepage=true;
      this.adminPage=false;
    }
    
  }
  loadData() {
    this.userType = localStorage.getItem('userType');
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.errorLabel = false;
    this.warningLabel = false;
    this.errorListBox = false;
  }

  showDialog() {
    this.visible = true;
  }
  stopBlinking(): void {
    this.isBlinking = false;
  }

  getDataConfiguration() {
    this.hostname = [];
    this.verifyButton = true;
    this.verifyMessage = false;
    this.invalidMessage = false;
    this.configurationForm = true;
    this.configurationFormCover = false;
    this.loadingScreen = false;
    this.successScreen = false;
    this.errorListBox = false;
    this.convertErrorScreen = false;
    this.CreateRetrieveUpdateBtn = false;
    this.isBlinking = false;
    this.warningLabel2 = false;

    if (this.selectedFile) {
      console.log(this.selectedFile);

      const formData = new FormData();
      formData.append('excelFile', this.selectedFile);
      this.isLoading = true;
      this.service.getDataConfiguration(formData).subscribe({
        next: (fileres: any) => {
          if (fileres.status === 200) {
            this.isLoading = false;
            this.visible = true;
            this.dataConfig = fileres;
            this.dataConfig_list = Object.values(fileres);
            console.log(this.dataConfig_list);
            this.portname = [];
            this.databasename = [];
            this.excelData = new DbConfig();
            this.excel = [];
            let host = Object.keys(this.dataConfig_list[0]);
            for (var i = 0; i < host.length; i++) {
              let key = { 'host': host[i] }
              this.hostname.push(key);
              console.log(this.hostname);
            }
          }
          else {
            // console.error('Error retrieving database configurations:', fileres.message);
            this.responseMessage = fileres.message;
            console.log(this.responseMessage);
            this.isLoading = false;
            this.warningLabel = false;
            this.errorListBox = true;
          }
        },
        error:(error)=>{
          this.isLoading = false;
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Oops!",
            text:"Something went wrong.",
            showConfirmButton: true
          });
        }
      }
       
      );
    }
    else {
      this.isLoading = false;
      this.errorLabel = false;
      this.warningLabel = true;
      setTimeout(() => {
        this.warningLabel = false;
      }, 10000);

    }
  }

  getDataConfigurationaddTable() {
    this.hostname = [];
    this.verifyButton = true;
    this.verifyMessage = false;
    this.invalidMessage = false;
    this.configurationForm = true;
    this.configurationFormCover = false;  
    this.loadingScreen = false;
    this.successScreen = false;
    this.errorListBox = false;
    this.convertErrorScreen = false;
    this.CreateRetrieveUpdateBtn = false;
    this.isBlinking = false;
    this.warningLabel2 = false;

    if (this.selectedFile) {
      console.log(this.selectedFile);
      const formData = new FormData();
      formData.append('excelFile', this.selectedFile); 
      this.isLoading = true;
      this.service.getDataConfiguration(formData).subscribe({
        next:   (fileres: any) => {
          if (fileres.status === 200) {
            this.isLoading = false;
            this.AddTablevisible = true;
            this.dataConfig = fileres;
            this.dataConfig_list = Object.values(fileres);
            console.log(this.dataConfig_list);
            this.portname = [];
            this.databasename = [];
            this.excelData = new DbConfig();
            this.excel = [];
            let host = Object.keys(this.dataConfig_list[0]);
            for (var i = 0; i < host.length; i++) {
              let key = { 'host': host[i] }
              this.hostname.push(key);
              console.log(this.hostname);
            }
          }
          else 
          {
            console.error('Error retrieving database configurations:', fileres.message);
            this.responseMessage = fileres.message;
            console.log(this.responseMessage);
            this.isLoading = false;
            this.warningLabel = false;
            this.errorListBox = true;
          }
        },
        error:(error)=>{
          this.isLoading = false;
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Oops!",
            text:"Something went wrong.",
            showConfirmButton: true
          });
        }
      }
      );
    }
    else {
      this.errorLabel = false;
      this.warningLabel = true;
      setTimeout(() => {
        this.warningLabel = false;
      }, 10000);

    }
  }

  getDataConfigurationaddField() {
    this.hostname = [];
    this.verifyButton = true;
    this.verifyMessage = false;
    this.invalidMessage = false;
    this.configurationForm = true;
    this.configurationFormCover = false;
    this.loadingScreen = false;
    this.successScreen = false;
    this.errorListBox = false;
    this.convertErrorScreen = false;
    this.CreateRetrieveUpdateBtn = false;
    this.isBlinking = false;
    this.warningLabel2 = false;


    if (this.selectedFile) {
      console.log(this.selectedFile);
      const formData = new FormData();
      formData.append('excelFile', this.selectedFile);
      this.isLoading = true;
      this.service.getDataConfiguration(formData).subscribe({
        next:   (fileres: any) => {
          if (fileres.status === 200) {
            this.isLoading = false;
            this.AddFieldvisible = true;
            this.dataConfig = fileres;
            this.dataConfig_list = Object.values(fileres);
            console.log(this.dataConfig_list);
            this.portname = [];
            this.databasename = [];
            this.excelData = new DbConfig();
            this.excel = [];
            let host = Object.keys(this.dataConfig_list[0]);
            for (var i = 0; i < host.length; i++) {
              let key = { 'host': host[i] }
              this.hostname.push(key);
              console.log(this.hostname);
            }
          }
          else {
            console.error('Error retrieving database configurations:', fileres.message);
            this.responseMessage = fileres.message;
            console.log(this.responseMessage);
            this.isLoading = false;
            this.warningLabel = false;
            this.errorListBox = true;
          }
        },
        error:(error)=>{
          this.isLoading=false;
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Oops!",
            text:"Something went wrong.",
            showConfirmButton: true
          });
        }
      });
    }
    else {
      this.errorLabel = false;
      this.warningLabel = true;
      setTimeout(() => {
        this.warningLabel = false;
      }, 10000);

    }
  }


  selectport(event: any) {
    this.portname = [];
    this.verifyButton = true;
    this.verifyMessage = false;
    this.invalidMessage = false;
    this.excelData.DatabaseName = '';
    this.dataConfig_list = Object.values(this.dataConfig);
    var objectContainingIP = this.dataConfig_list[0];
    console.log(objectContainingIP);
    this.dataConfig_list = objectContainingIP[event.value.host];
    let port = Object.keys(this.dataConfig_list);
    for (var i = 0; i < port.length; i++) {
      let key = { port: port[i] }
      this.portname.push(key);
      console.log(this.portname);
    }
    this.databasename = [];
  }


  selectDatabase(event: any) {
    this.excelData.DatabaseName = '';
    this.databasename = [];
    var objectContainingIP = this.dataConfig_list;
    let database = objectContainingIP[event.value.port];
    for (var i = 0; i < database.length; i++) {
      let key = { database: database[i] }
      this.databasename.push(key);
    }
  }


  onVerify() {
    if (!this.excelData.SqlUsername || !this.excelData.SqlPassword) {
      if (!this.excelData.SqlUsername) {
        this.isBlinking = true;
      }
      if (!this.excelData.SqlPassword) {
        this.isBlinking = true;
      }
    }

    else {
      this.warningLabel2 = false;
      const convertedConfig = {
        host: (this.excelData.SqlHost as any).host,
        port: (this.excelData.SqlPort as any).port,
        username: this.excelData.SqlUsername,
        password: this.excelData.SqlPassword,
        databasename: []
      }
      this.databasename.push(this.excelData.DatabaseName);
      this.service.verifyConfiguration(convertedConfig).subscribe({
        next: (res) => {
          if (res.status == 200) {
            this.verifyMessage = true;
            setTimeout(() => {
              this.verifyMessage = false;
              this.verifyButton = true;
            }, 3000);
            this.invalidMessage = false;
            this.verifyButton = false;
            for (var i = 0; i < this.excelData.DatabaseName.length; i++) {
              let db = (this.excelData.DatabaseName[i] as any).database;
              const converted = {
                id: Math.floor(Math.random() * 100),
                DatabaseName: db,
                SqlHost: convertedConfig.host,
                SqlPort: convertedConfig.port,
                SqlUsername: convertedConfig.username,
                SqlPassword: convertedConfig.password
              };
              if ((this.excel.some(config => config.DatabaseName === converted.DatabaseName) == false) ||
                (this.excel.some(config => config.SqlHost === converted.SqlHost) == false)
                || (this.excel.some(config => config.SqlPort === converted.SqlPort) == false)) {
                this.excel.push(converted);
                this.excel=[...this.excel];
                if (this.dataTable) {
                  this.dataTable.first = 0; // Example usage
                }
              }
            }
            this.excelData = new DbConfig();
            this.portname = [];
            this.databasename = [];
          }
          else {
            console.log(res.status);
            this.invalidMessage = true;
            this.verifyMessage = false;
            this.verifyButton = false;
          }
        },
        error:(error)=>{
          this.isLoading=false
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Oops!",
            text:"Something went wrong.",
            showConfirmButton: true
          });
        }
      }
       );
    }
  }


  inputboxClick(event: any) {
    this.invalidMessage = false;
    this.verifyButton = true;
    this.verifyMessage = false;
    this.isBlinking = false;
    this.warningLabel2 = false;
  }


  onConvert() {
    const groupedByHost = this.excel.reduce((acc, item) => {
      const key = `${item.SqlHost}-${item.SqlPort}-${item.SqlUsername}-${item.SqlPassword}-${item.DatabaseName}`;
      if (!acc[key]) {
        acc[key] = {
          host: item.SqlHost,
          port: item.SqlPort,
          username: item.SqlUsername,
          password: item.SqlPassword,
          databaseName: item.DatabaseName
        };
      }
      return acc;
    }, {});

    this.finalList = Object.values(groupedByHost);
    console.log(this.finalList);
    if (this.excel.length > 0) {
      this.warningLabel2 = false;
      this.configurationForm = false;
      this.convertExcelData();
    }
    else {
      this.errorMessage = 'Not found the verified database configuration';
      this.warningLabel2 = true;
    }
  }


  convertExcelData() {
    if (this.selectedFile && this.finalList != null) {
      this.loadingScreen = true;
      this.service.convertExcel(this.selectedFile, this.finalList).subscribe({
        next:(convertResponse: any) => {
          if (convertResponse.status == 200) {
            this.loadingScreen = false;
            this.visible = false;
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Converted Successfully!",
              showConfirmButton: false,
              timer: 3000
            });
          }
          else {
            this.convertErrorMessage = convertResponse.message;
            this.visible = false;
            this.Errorvisible = true;
            this.successScreen = false;
            this.loadingScreen = false;
          }
  
        },
        error:(error)=>{
          this.isLoading=false;
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Oops!",
            text:"Something went wrong.",
            showConfirmButton: true
          });
        }
      });
    }
  }


  onaddTable(){
    const groupedByHost = this.excel.reduce((acc, item) => {
      const key = `${item.SqlHost}-${item.SqlPort}-${item.SqlUsername}-${item.SqlPassword}-${item.DatabaseName}`;
      if (!acc[key]) {
        acc[key] = {
          host: item.SqlHost,
          port: item.SqlPort,
          username: item.SqlUsername,
          password: item.SqlPassword,
          databaseName: item.DatabaseName
        };
      }
      return acc;
    }, {});
  
    this.finalList = Object.values(groupedByHost);
    if (this.excel.length > 0) {
      this.warningLabel2 = false;
      this.configurationForm = false;
      this.addTableConvertExcelData();
    }
    else {
      this.errorMessage = 'Not found the verified database configuration';
      this.warningLabel2 = true;
    }
  }


  addTableConvertExcelData() {
    if (this.selectedFile && this.finalList != null) {
      this.loadingScreen = true;
      this.service.addTable(this.selectedFile, this.finalList).subscribe({
        next:        (convertResponse: any) => {

          console.log(this.finalList);
          if (convertResponse.status == 200) {
            this.loadingScreen = false;
            this.AddTablevisible = false;
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Converted Successfully!",
              showConfirmButton: false,
              timer: 3000
            });
          }
          else {
            this.convertErrorMessage = convertResponse.message;
            this.AddTablevisible = false;
            this.Errorvisible = true;
            this.successScreen = false;
            this.loadingScreen = false;
          }
        },
        error:(error)=>{
          this.loadingScreen = false;
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Oops!",
            text:"Something went wrong.",
            showConfirmButton: true
          });
        }
      });
    }
  }


  onaddField(){
    const groupedByHost = this.excel.reduce((acc, item) => {
      const key = `${item.SqlHost}-${item.SqlPort}-${item.SqlUsername}-${item.SqlPassword}-${item.DatabaseName}`;
      if (!acc[key]) {
        acc[key] = {
          host: item.SqlHost,
          port: item.SqlPort,
          username: item.SqlUsername,
          password: item.SqlPassword,
          databaseName: item.DatabaseName
        };
      }
      return acc;
    }, {});
  
    this.finalList = Object.values(groupedByHost);
    console.log(this.finalList);
    if (this.excel.length > 0) {
      this.warningLabel2 = false;
      this.configurationForm = false;
      this.addFieldConvertExcelData();
    }
    else {
      this.errorMessage = 'Not found the verified database configuration';
      this.warningLabel2 = true;
    }
  }


  addFieldConvertExcelData() {
    if (this.selectedFile && this.finalList != null) {
      this.loadingScreen = true;
      this.service.addField(this.selectedFile, this.finalList).subscribe({
        next:(Response: any) => {
          if (Response.status == 200) {
            this.loadingScreen = false;
            this.AddFieldvisible = false;
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Converted Successfully!",
              showConfirmButton: false,
              timer: 3000
            });
          }
          else {
            this.convertErrorMessage = Response.message;
            this.AddFieldvisible = false;
            this.Errorvisible = true;
            this.successScreen = false;
            this.loadingScreen = false;
          }
        },
        error:(error)=>{
          this.loadingScreen = false;
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Oops!",
            text:"Something went wrong.",
            showConfirmButton: true
          });
        }
      });
    }
  }


  closeErrorWindow() {
    this.convertErrorScreen = false;
  }

 
  deleteSelectedConfiguration() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected database configurations?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.excel = this.excel.filter((val) => !this.selectedConfiguration?.includes(val));
        this.selectedConfiguration = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Connection Deleted', life: 3000 });
      }
    });
  }



  deleteConfigurations(data: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete database configuration?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.excel = this.excel.filter((val) => (val.id !== data.id));
        this.messageService.add({ severity: 'success', summary: 'Successfull', detail: 'Connection Deleted', life: 3000 });
     
      }
    });
  }


  hideDialog() {
    this.configDialog = false;
    this.submitted = false;
  }


  onclickDownLoad() {
    this.CreateRetrieveUpdateBtn = !this.CreateRetrieveUpdateBtn;
    this.errorLabel = false;
    this.warningLabel = false;
    this.errorListBox = false;
  }


  downloadExcel(): void {
    this.errorListBox = false;
    this.errorLabel = false;
    this.isLoading=true;
    this.service.generateExcelforCreation().subscribe({
      next:blob => {
        this.isLoading=false;
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.download = 'DesignCreation.xlsx';
        anchor.href = url;
        anchor.click();
        window.URL.revokeObjectURL(url);
        this.isLoading = false;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Downloaded Successfully!",
          showConfirmButton: false,
          timer: 2500
        });
      },
      error:error=>{
        console.log(error); 
        this.isLoading=false;
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops!",
          text:"Something went wrong.",
          confirmButtonColor: '#009182',
          showConfirmButton: true
        });
      
      }
    });
  }


  onRetrieveStructure() {
    this.RetiveDataVisible = true;
    this.dataRetrieve.Host = '';
    this.dataRetrieve.Port = '';
    this.dataRetrieve.Username = '';
    this.dataRetrieve.Password = '';
    this.dataRetrieve.DatabaseName = '';
    this.databaseNameList = [];
    this.tableName = [];
    this.dataRetrieve.Table = [];
    this.verifyButton = true;
    this.verifyMessage = false;
    this.retrieveDataDatabaseList = [];
    this.isBlinking = false;
    this.warningLabel2 = false;
    this.errorListBox = false;
  }


  retrivedataVerification() {
    if (!this.dataRetrieve.Host || !this.dataRetrieve.Port || !this.dataRetrieve.Username || !this.dataRetrieve.Password) {
      if (!this.dataRetrieve.Host) {
        this.isBlinking = true;
      }
      if (!this.dataRetrieve.Port) {
        this.isBlinking = true;
      }
      if (!this.dataRetrieve.Username) {
        this.isBlinking = true;
      }
      if (!this.dataRetrieve.Password) {
        this.isBlinking = true;
      }
    }
    else {
      this.isLoading = true;
      this.service.retrieveSchema(this.dataRetrieve).subscribe({
        next:(res) => {
          if (res.status == "200") {
            this.isLoading = false;
            this.database = res.data;
            this.databaseNameList = Object.keys(res.data);
            this.databaseNameList=[...this.databaseNameList];
            this.verifyMessage = true;
            this.verifyButton = false;
          }
          else {
            this.isLoading = false;
            this.invalidMessage = true;
            this.verifyButton = false;
          }
        },
        error:(error)=>{
          this.isLoading = false;
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Oops!",
            text:"Something went wrong.",
            showConfirmButton: true
          });
        }
      });
    }
  }


  onDatabaseSelect(event: any) {
    this.tableName = [];
    this.selectedTableName = [];
    this.dataRetrieve.Table = [];
    const dbName = event.value;
    this.selectedDatabaseName = dbName;
    this.tableName = this.database[dbName];
  }


  onTableSelect(event: any) {
    this.selectedTableName = event.value;
    console.log(this.selectedTableName);
  }


  addToRetrieveDatabaseList() {
    if (this.selectedTableName.length > 0) {
      const convertedConfig = {
        id: Math.floor(Math.random() * 100),
        host: this.dataRetrieve.Host,
        port: this.dataRetrieve.Port,
        username: this.dataRetrieve.Username,
        password: this.dataRetrieve.Password,
        databaseName: this.selectedDatabaseName,
        tableName: this.selectedTableName
      }
      const existingConfig = this.retrieveDataDatabaseList.find(config => config.databaseName === convertedConfig.databaseName);
      if (existingConfig) {
        existingConfig.tableName = convertedConfig.tableName;
      }
      else {
        this.retrieveDataDatabaseList.push(convertedConfig);
        this.retrieveDataDatabaseList = [...this.retrieveDataDatabaseList];
        this.dataTable.first=0;
      }
    }
    else {
      this.isBlinking = true;
    }
  }


  deleteSelectedList() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected database and  table list?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.retrieveDataDatabaseList = this.retrieveDataDatabaseList.filter((val) => !this.selectedDbAndTableList?.includes(val));
        this.selectedDbAndTableList = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Deleted', life: 3000 });

      }
    });
  }


  deleteList(data: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete database?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.retrieveDataDatabaseList = this.retrieveDataDatabaseList.filter((val) => (val.id !== data.id));
        this.selectedDbAndTableList = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Deleted', life: 3000 });
      }
    });
  }


  onGenerateOfReteiveStructure() {
    if (this.retrieveDataDatabaseList.length > 0) {
      this.isLoading = true;
      this.service.generateSpreadsheetForRetrieveData(this.retrieveDataDatabaseList).subscribe({
        next:blob => {
          console.log(blob);
          this.downloadFile(blob, 'STM_SpreadSheetFiles.zip');
          this.isLoading = false;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Downloaded Successfully!",
            showConfirmButton: false,
            timer: 3000
          });
          this.retrieveDataDatabaseList = [];
          this.RetiveDataVisible = false;
        }, 
        error: error => {
          this.isLoading = false;
          this.messageService.add({ severity: 'error', summary: 'Oops!', detail: 'Something went wrong! Please try again. ', life: 6000 });
        }
      });
    }
    else {
      this.errorMessage = 'Not found the database and table list';
      this.warningLabel2 = true;
    }
  }

  onretrieveData() {
    this.RetiveAllDataVisible = true;
    this.dataRetrieve.Host = '';
    this.dataRetrieve.Port = '';
    this.dataRetrieve.Username = '';
    this.dataRetrieve.Password = '';
    this.dataRetrieve.DatabaseName = '';
    this.databaseNameList = [];
    this.tableName = [];
    this.dataRetrieve.Table = [];
    this.verifyButton = true;
    this.verifyMessage = false;
    this.retrieveDataDatabaseList = [];
    this.isBlinking = false;
    this.warningLabel2 = false;
    this.errorListBox = false;
  }

  
  onGenerateRetrieveData(){
    if (this.retrieveDataDatabaseList.length > 0) {
      this.isLoading = true;
      console.log(this.retrieveDataDatabaseList);
      
      this.service.generateSpreadsheetForRetrieveAllDetails(this.retrieveDataDatabaseList).subscribe(blob => {
        console.log(blob);
        this.downloadFile(blob, 'STM_SpreadSheetFiles.zip');
        this.isLoading = false;
        
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Downloaded Successfully!",
          showConfirmButton: false,
          timer: 3000
        });
        this.retrieveDataDatabaseList = [];
        this.RetiveAllDataVisible = false;
      },
       error => {
        this.messageService.add({ severity: 'error', summary: 'Oops!', detail: 'Something went wrong! Please try again. ', life: 6000 });
      });
    }
    else {
      this.errorMessage = 'Not found the database and table list';
      this.warningLabel2 = true;
    }
  }


  onUpdateClick() {
    this.UpdateDataVisible = true;
    this.verifyButton = true;
    this.verifyMessage = false;
    this.errorListBox = false;
    this.dataRetrieve.Host = '';
    this.dataRetrieve.Port = '';
    this.dataRetrieve.Username = '';
    this.dataRetrieve.Password = '';
    this.dataRetrieve.DatabaseName = '';
    this.dataRetrieve.Table = [];
  }


  onGenerateOfUpdateData() {
    this.updateDataObject.host = this.dataRetrieve.Host;
    this.updateDataObject.port = this.dataRetrieve.Port;
    this.updateDataObject.username = this.dataRetrieve.Username;
    this.updateDataObject.password = this.dataRetrieve.Password;
    this.updateDataObject.databaseName = this.selectedDatabaseName;
    this.updateDataObject.tableName= this.selectedTableName;
    var fileName = this.selectedDatabaseName + '.xlsx';
    this.isLoading = true;
    console.log(this.updateDataObject);
    console.log(fileName);
    this.service.generateSpreadsheetForUpdateData(this.updateDataObject).subscribe({
      next:  (blob) => {
        this.downloadFile(blob, fileName);
        this.isLoading = false;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Downloaded Successfully!",
          showConfirmButton: false,
          timer: 2500
        });
        this.UpdateDataVisible = false;
      }, 
      error:(error) => {
        console.log(error);
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Oops!', detail: 'Something went wrong! Please try again. ', life: 6000 });
      }
    }
    );
  }


  private downloadFile(data: Blob, filename: string) {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    window.URL.revokeObjectURL(url);
    anchor.remove();
  }


  downloadPDFCreate(): void {
    this.service.downloadFileForDownload().subscribe(blob => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'HowItsWorks.pdf';
      link.click();
    });
  }

  
  downloadPDFDownload(): void {
    this.service.downloadFileForDownload().subscribe(blob => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'Howitsworks2.pdf';
      link.click();
    });
  }

}




