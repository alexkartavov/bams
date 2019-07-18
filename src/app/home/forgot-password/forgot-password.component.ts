import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email = '';
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(q => {
      this.email = q['username'];
    });
  }

  sendResetRequest() {
    const win = window.open('https://passwordreset.microsoftonline.com?username=' + this.email, '_blank');
    win.focus();
  }

  resetPassword() {
    this.router.navigateByUrl('/home');
  }

  cancelReset() {
    this.router.navigateByUrl('/home');
  }

}
