import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData: any;
  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    ) { }

  ngOnInit(): void {
    this.getuserData();
  }
  // Method to fetch user data
  getuserData() {
    this.profileService.getUserData().subscribe((resp: any)=> {
      if(resp.success === true) {
        this.userData = resp.data.userData;
        console.log(this.userData);
      }
    })
  }

  // Method to logout
  logout() {
    this.authService.logout();
  }

}
