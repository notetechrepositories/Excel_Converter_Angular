import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TutorialPageComponent } from './tutorial-page/tutorial-page.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ForgotAndResetComponent } from './forgot-and-reset/forgot-and-reset.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisteredCompanyComponent } from './registered-company/registered-company.component';
import { RegisteredUserComponent } from './registered-user/registered-user.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: "home", component: HomeComponent},
      {path: '', component: HomeComponent},
      {path: "tutorial-page", component: TutorialPageComponent},
      {path: "admin", component: AdminDashboardComponent},
      {path:"registered-company",component:RegisteredCompanyComponent},
      {path:"registered-user",component:RegisteredUserComponent},
      {path:"admin-dashboard",component:AdminDashboardComponent},

  {path: "login", component: LoginComponent},
  {path: "forgot-and-reset", component: ForgotAndResetComponent},
  {path:"profile",component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
