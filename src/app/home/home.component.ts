import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { TabsNavService } from '../_services/tabs.nav.service';
import { Router, NavigationExtras } from '@angular/router';
import { SupportUserDataService } from '../_services/support-user-data.service';
import { ProfileService } from '../_services/profile.service';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  model: any = {};
  env = environment;

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

  login(model) {
    if (model.pin) { // the auth requires another login with an MFA code
      this.authService.setMfaCode(model.pin);
      this.authService.login(model,
        user => {
          model.pin = '';
          this.authService.setMfaCode('');
          this.loadUserProfile();
        }
      );
    } else { // the MFA component already logged us in, just need to load the profile
      this.authService.setMfaCode('');
      this.loadUserProfile();
    }
  }

  loadUserProfile() {
    this.alertify.success('Logged in successfully');
    this.userService.getProfile(this.authService.getUserId()).subscribe(
      profile => this.profileService.setProfile(profile, false),
      err => console.error(err)
    );
  }

  isAdmin(): boolean {
    return this.authService.getUserRole() === Role.Admin;
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
