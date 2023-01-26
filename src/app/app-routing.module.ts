import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PatientAddComponent } from './components/patient-add/patient-add.component';
import { PatientComponent } from './components/patient/patient.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"", pathMatch:"full" , component:PatientComponent},
  {path:"patients", component:PatientComponent},
  {path:"patients/hospital/:hospitalId", component:PatientComponent},
  {path:"patients/add", component:PatientAddComponent, canActivate:[LoginGuard]},
  {path:"login", component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
