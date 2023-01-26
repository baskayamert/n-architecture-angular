import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientComponent } from './components/patient/patient.component';
import { HospitalComponent } from './components/hospital/hospital.component';
import { NavComponent } from './components/nav/nav.component';
import { CensoredNationalityNoPipe } from './pipes/censored-nationality-no.pipe';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';


import { ToastrModule } from 'ngx-toastr';
import { PatientAddComponent } from './components/patient-add/patient-add.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HttpRequestInterceptor } from './interceptors/http-request.interceptor';

export function tokenGetter(){
  return localStorage.getItem("accessToken");
}

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    HospitalComponent,
    NavComponent,
    CensoredNationalityNoPipe,
    FilterPipePipe,
    PatientAddComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass:HttpRequestInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
