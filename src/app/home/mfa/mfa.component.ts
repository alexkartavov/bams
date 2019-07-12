import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-mfa',
  templateUrl: './mfa.component.html',
  styleUrls: ['./mfa.component.scss']
})
export class MfaComponent implements OnInit {
  modalRef: BsModalRef;
  public code = ['', '', '', '', '', ''];
  requesting = false;

  @Input() model: any;
  @Output() codeEntered: EventEmitter<any> = new EventEmitter<any>();
  @Output() loggedIn: EventEmitter<any> = new EventEmitter<any>();

  constructor(private modalService: BsModalService,
    private authService: AuthService,
    private alertify: AlertifyService) { }

  ngOnInit() {
  }

  openModal(template: BsModalService) {
    this.requesting = true;
    this.model.pin = '';
    this.modalRef = this.modalService.show(template);
    this.authService.login(this.model,
      user => {
        window.setTimeout(() => {
          this.modalRef.hide();
        }, 200);
        this.loggedIn.emit(user);
      },
      status => {
        this.requesting = false;
      },
      err => {
        window.setTimeout(() => {
          this.modalRef.hide();
        }, 200);
        this.alertify.error(err);
      }
    );
  }

  done() {
    this.modalRef.hide();
    this.model.pin = this.code.join('');
    this.codeEntered.emit(this.model);
  }

  codeValid() {
    let valid = true;
    this.code.forEach(c => {
      if (!c) {
        valid = false;
      }
    });
    return valid;
  }

  keyPress(evt) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(evt.charCode);
    if (evt.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyUp(evt, nextEl?) {
    const val: string = evt.srcElement.value;
    if (val.length > 1) {
      evt.srcElement.value = val.substring(val.length - 1);
    }
    if (nextEl) {
      nextEl.focus();
    }
  }

}
