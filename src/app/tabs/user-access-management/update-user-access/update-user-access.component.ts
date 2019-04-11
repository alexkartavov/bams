import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { UserAccessModel } from 'src/app/models/user-access-model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { SupportUserDataService } from 'src/app/_services/support-user-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/_services/must-match';
import { ValueProcessingService } from 'src/app/_services/value-processing.service';

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

  constructor(private formBuilder: FormBuilder,
      private modalService: BsModalService,
      private alertify: AlertifyService,
      private userDataService: SupportUserDataService,
      private valueService: ValueProcessingService) {
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
    } else {
      this.model.id = 0;
      this.model.firstName = '';
      this.model.lastName = '';
      this.model.email = '';
      this.model.password = '';
      this.model.role = '';
    }
  }

  updateModel() {
    this.model.firstName = this.f.firstName.value;
    this.model.lastName = this.f.lastName.value;
    this.model.email = this.f.email.value;
    this.model.password = this.f.password.value;
    this.model.role = this.f.role.value;
  }

  updateFormControls() {
    this.updateForm = this.formBuilder.group({
      firstName: [this.model.firstName, Validators.required],
      lastName: [this.model.lastName, Validators.required],
      email: [this.model.email, [Validators.required, Validators.email]],
      password: [this.model.password],
      confirmPassword: [this.model.password],
      role: [this.model.role, Validators.required]
    }, {
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
}
