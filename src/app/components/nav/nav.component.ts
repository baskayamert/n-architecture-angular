import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  /**
   *
   */
  constructor(private authService:AuthService) {}
  ngOnInit(): void {
  }
  refreshToken(){
    let refreshToken = localStorage.getItem("refreshToken")
    if(refreshToken) {
      this.authService.refreshToken(refreshToken).subscribe(res => {
        console.log(res)
      }, err => {
        console.log(err)
      })
    }

  }
}
