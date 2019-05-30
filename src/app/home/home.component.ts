import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { TabsNavService } from '../_services/tabs.nav.service';
import { Router, NavigationExtras } from '@angular/router';
import { SupportUserDataService } from '../_services/support-user-data.service';
import { ProfileService } from '../_services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  model: any = {};

  constructor(
    private authService: AuthService,
    private userService: SupportUserDataService,
    private profileService: ProfileService,
    private alertify: AlertifyService,
    public tabsNav: TabsNavService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  login() {
    this.authService.login(this.model).subscribe(
      user => {
        this.alertify.success('Logged in successfully');
        // TODO after auth is fully implemented, use logged in user info to get the profile
        // this.profileService.setProfile(user.userProfile, false);
        this.userService.getProfile(this.authService.getUserId()).subscribe(
          profile => this.profileService.setProfile(profile, false),
          err => console.error(err)
        );
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  createAccount() {
    // TODO
  }

  search(searchText) {
    const params: NavigationExtras = {
      queryParams: {
        search: searchText
      }
    };
    this.router.navigate(['merch'], params);
  }
}
