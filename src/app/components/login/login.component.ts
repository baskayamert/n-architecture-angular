import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserLoginDto } from 'src/app/models/DTOs/UserDtos/UserLoginDto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private toastrService:ToastrService) {
    
  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let userLoginDto:UserLoginDto = this.loginForm.value;
      this.authService.login(userLoginDto).subscribe(res => {
        this.toastrService.success(res.message);
        localStorage.setItem("accessToken",res.accessToken)
        localStorage.setItem("refreshToken",res.refreshToken)
      },responseError => {
        this.toastrService.error(responseError.error);
      })
    }
  }
}
