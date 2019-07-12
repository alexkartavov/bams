import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { UserAccessModel } from 'src/app/models/user-access-model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { SupportUserDataService } from 'src/app/_services/support-user-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/_services/must-match';
import { ValueProcessingService } from 'src/app/_services/value-processing.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-update-user-access',
  templateUrl: './update-user-access.component.html',
  styleUrls: ['./update-user-access.component.scss']
})
export class UpdateUserAccessComponent implements OnInit {
  @Input() showBtnText: string;
  @Input() header: string;
  @Input() okBtnText: string;
  @Input() user: UserAccessModel;
  @Output() userUpdated: EventEmitter<UserAccessModel> = new EventEmitter<UserAccessModel>();
  @Output() userAdded: EventEmitter<UserAccessModel> = new EventEmitter<UserAccessModel>();
  modalRef: BsModalRef;
  public userRoleData: string[];

  public updateForm: FormGroup;

  public model: UserAccessModel;

  channels = [];
  SHOW_ALL = false; // DEBUG: set to true to show all channels

  constructor(private formBuilder: FormBuilder,
      private modalService: BsModalService,
      private alertify: AlertifyService,
      private userDataService: SupportUserDataService,
      private valueService: ValueProcessingService,
      private authService: AuthService) {
    this.model = new UserAccessModel();
    this.userRoleData = valueService.userRoles();
  }

  ngOnInit() {
    this.initModel();
    this.updateFormControls();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.updateForm.controls;
  }

  initModel() {
    if (this.isUpdating()) {
      if (!this.user) {
        return;
      }
      this.model.id = this.user.id;
      this.model.firstName = this.user.firstName;
      this.model.lastName = this.user.lastName;
      this.model.email = this.user.email;
      this.model.password = this.user.password;
      this.model.role = this.user.role;
      this.userChannels().forEach(channel => {
        this.model[channel.property] = this.user[channel.map] ? this.user[channel.map] : false;
      });
    } else {
      this.model.id = 0;
      this.model.firstName = '';
      this.model.lastName = '';
      this.model.email = '';
      this.model.password = '';
      this.model.role = '';
      this.userChannels().forEach(channel => {
        this.model[channel.property] = false;
      });
    }
  }

  updateModel() {
    this.model.firstName = this.f.firstName.value;
    this.model.lastName = this.f.lastName.value;
    this.model.email = this.f.email.value;
    this.model.password = this.f.password.value;
    this.model.role = this.f.role.value;
    this.userChannels().forEach(channel => {
      this.model[channel.property] = this.f[channel.property].value;
    });
  }

  updateFormControls() {
    const controlsConfig = {
      firstName: [this.model.firstName, Validators.required],
      lastName: [this.model.lastName, Validators.required],
      email: [this.model.email, [Validators.required, Validators.email]],
      password: [this.model.password],
      confirmPassword: [this.model.password],
      role: [this.model.role, Validators.required]
    };

    this.userChannels().forEach((c) => {
      controlsConfig[c.property] = [this.model[c.property]];
    });
    this.updateForm = this.formBuilder.group(controlsConfig, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  openModal(template: BsModalService) {
    this.modalRef = this.modalService.show(template);
    this.initModel();
    this.updateFormControls();
  }

  update() {
    this.updateModel();
    if (this.isUpdating()) {
      this.userDataService.update(this.model,
        () => {
          this.alertify.success('User has been updated successfully.');
          this.userUpdated.emit(this.model);
        },
        (error) => this.alertify.error('An error has occured: ' + error));
    } else {
      this.userDataService.createUser(this.model,
        () => {
          this.alertify.success('User has been added successfully.');
          this.userAdded.emit(this.model);
        },
        (error) => this.alertify.error('Error: ' + error));
    }
  }

  isUpdating(): boolean {
    return this.okBtnText === 'Update';
  }

  isRoleSelected(role) {
    return this.getUserRoleValue(role) === this.model.role;
  }

  getUserRoleValue(role: string): string {
    return this.valueService.getUserRoleValue(role);
  }

  self(): boolean {
    return this.user && this.authService.getUserId() === this.user.id;
  }

  userChannels() {
    if (this.user && this.channels.length === 0) {
      this.valueService.channels.forEach(c => {
        if (this.SHOW_ALL || this.authService.getCepSupportUser()[c.property]) {
          this.channels.push(c);
        }
      });
    }
    return this.channels;
  }
}
