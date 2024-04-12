import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './navigation/navigation.component';
import { TutorialPageComponent } from './tutorial-page/tutorial-page.component';


// PrimeNg module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageModule } from 'primeng/message';
import { AnimateModule } from 'primeng/animate';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import {PaginatorModule} from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { ForgotAndResetComponent } from './forgot-and-reset/forgot-and-reset.component';
import { DatePipe } from '@angular/common';
import { RegisteredCompanyComponent } from './registered-company/registered-company.component';
import { RegisteredUserComponent } from './registered-user/registered-user.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    TutorialPageComponent,
    AdminDashboardComponent,
    LoginComponent,
    ForgotAndResetComponent,
    RegisteredCompanyComponent,
    RegisteredUserComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
//------------------------------------- PrimeNg Module -------------------------------------------
    TableModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    ToastModule,
    ToolbarModule,
    TagModule,
    DragDropModule,
    DropdownModule,
    RadioButtonModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    FileUploadModule,
    MessageModule,
    AnimateModule,
    MessagesModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    CardModule,
    CheckboxModule,
    PaginatorModule,
    TooltipModule,
    ProgressSpinnerModule
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
