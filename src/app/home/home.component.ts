import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { TabsNavService } from '../_services/tabs.nav.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  model: any = {};

  constructor(
    private authService: AuthService,
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
      next => {
        this.alertify.success('Logged in successfully');
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
