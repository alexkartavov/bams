import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SupportTicketModel } from 'src/app/models/support-ticket';
import { CommentModel, CommentCreateModel } from 'src/app/models/comment-model';
import { SupportDataService } from 'src/app/_services/support-data.service';
import { AuthService } from 'src/app/_services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValueProcessingService } from 'src/app/_services/value-processing.service';
import { SupportUserDataService } from 'src/app/_services/support-user-data.service';
import { UsersDataSource } from '../../user-access-management/users-datasource';
import { UserAccessModel } from 'src/app/models/user-access-model';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { SupportDataSource } from '../support-datasource';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.scss']
})
export class ViewTicketComponent implements OnInit, OnDestroy {

  modalRef: BsModalRef;
  @Input() model: SupportTicketModel;
  @Output() success: EventEmitter <SupportTicketModel> = new EventEmitter();
  public newComment = '';
  public statusData: string[];

  public updateForm: FormGroup;

  public ticketsDataSource: SupportDataSource;
  public usersDataSource: UsersDataSource;
  public usersData: Observable<UserAccessModel[]>;
  public ticketComments: Observable<CommentModel[]>;
  commentsData: Array<CommentModel> = [];
  _commentsSub: Subscription;
  private placeholder = '.jpg .gif .jpeg .png .txt .pdf';
  public attachmentFileName: string;
  public submitting = false;

  constructor(
    private modalService: BsModalService,
    private supportDataService: SupportDataService,
    private usersDataService: SupportUserDataService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private valueService: ValueProcessingService,
    private alertify: AlertifyService) {
      this.statusData = valueService.statusValues;
      this.usersDataSource = new UsersDataSource(usersDataService);
      this.ticketsDataSource = new SupportDataSource(supportDataService);
      this.attachmentFileName = this.placeholder;
    }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      ticketStatus: ['', Validators.required],
      repAssigned: ['']
    });
    this.usersData = this.usersDataSource.connect();
    this.ticketComments = this.ticketsDataSource.connectComments();
    this._commentsSub = this.ticketComments.subscribe(posts => {
      this.commentsData = posts.sort((a, b) => {
        if (!a) {
          return 1;
        }
        if (!b) {
          return -1;
        }
        if (a.createdOn < b.createdOn) {
          return 1;
        }
        if (a.createdOn > b.createdOn) {
          return -1;
        }
        return 0;
      });
    });
  }

  ngOnDestroy() {
    this.usersDataSource.disconnect();
    this.ticketsDataSource.disconnect();
    this._commentsSub.unsubscribe();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.updateForm.controls;
  }

  openModal(template: BsModalService) {
    this.ticketsDataSource.loadComments(this.model.id);
    this.modalRef = this.modalService.show(template, {class: 'modal-lg', ignoreBackdropClick: true});
  }

  hasComments(): boolean {
    return this.commentsData.length > 0;
  }

  keydownEnter(event) {
    event.stopPropagation();
    event.preventDefault();
    return false;
  }

  postNewComment(event) {
    if (this.newComment) {
      const comment = new CommentCreateModel();
      comment.ticketId = this.model.id;
      comment.userId = this.authService.getUserId();
      comment.body = this.newComment;
      comment.title = '';

      const newComment = new CommentModel();
      newComment.body = comment.body;
      newComment.createdById = this.authService.getUserId();
      newComment.createdBy = this.authService.getUserName();
      newComment.createdOn = Date.now();
      this.commentsData.unshift(newComment);

      this.submitting = true;

      this.supportDataService.createComment(comment,
        () => {
          this.alertify.success('New comment has been posted');
          if (this.attachmentFileName && this.attachmentFileName !== this.placeholder) {
            const fileChooser = <HTMLInputElement>window.document.getElementById('attachmentFile');
            if (fileChooser.files && fileChooser.files.length > 0) {
              const uploadFile = fileChooser.files.item(0);

              this.supportDataService.uploadAttachment(this.model.id, uploadFile,
                () => {
                  this.newComment = '';
                  fileChooser.value = '';
                  this.attachmentFileName = this.placeholder;
                  this.submitting = false;
                  this.alertify.success('Attachment has been uploaded.');
                  this.success.emit();
                },
                (error) => {
                  this.submitting = false;
                  this.alertify.error('Error: ' + error);
                });
            } else {
              this.newComment = '';
              this.submitting = false;
            }
          } else {
            this.newComment = '';
            this.submitting = false;
          }
        },
        (err) => {
          this.alertify.error('An erro occured while posting the comment: ' + err);
          this.commentsData.shift();
        });
    }
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  // updateModel() {
  //   this.model.status = this.f.ticketStatus.value;
  //   this.model.assignedToId = this.f.repAssigned.value;
  // }

  update() {
    const fileChooser = <HTMLInputElement>window.document.getElementById('attachmentFile');
    fileChooser.value = '';
    this.attachmentFileName = this.placeholder;
  }

  updateStatus(error) {
    this.supportDataService.updateStatus(this.model.id, this.model.status,
      () => this.alertify.success('Ticket status updated'),
      (err) => {
        this.alertify.error('An error occured: ' + err);
        error();
      });
  }

  assignTicket(error) {
    this.supportDataService.assign(this.model.id, this.model.assignedToId,
      () => this.alertify.success('Ticket has been assigned'),
      (err) => {
        this.alertify.error('An error occured: ' + err);
        error();
      });
  }

  ticketTypeTitle(value) {
    return this.valueService.getTicketTypeTitle(value);
  }

  ticketStatusTitle(value) {
    return this.valueService.getTicketStatusTitle(value);
  }

  typeaheadSelect(event) {
    if (event.item) {
      const oldToId = this.model.assignedToId;
      const oldTo = this.model.assignedTo;

      this.model.assignedToId = event.item.id;
      this.model.assignedTo = event.item.firstName + ' ' + event.item.lastName;
      this.f.repAssigned.setValue(this.model.assignedTo);

      this.assignTicket(() => {
        this.model.assignedToId = oldToId;
        this.model.assignedTo = oldTo;
        this.f.repAssigned.setValue(oldTo);
      });
    }
  }

  changeTypeaheadLoading(loading: boolean) {
    if (loading) {
      this.usersDataSource.loadUsers({
        search: this.f.repAssigned.value
      });
    }
  }

  statusChanged() {
    const oldStatus = this.model.status;
    this.model.status = this.f.ticketStatus.value;

    this.updateStatus(() => {
      this.model.status = oldStatus;
    });
  }

  repChanged() {
    if (!this.f.repAssigned.value) {
      const oldToId = this.model.assignedToId;
      const oldTo = this.model.assignedTo;

      this.model.assignedToId = -1;
      this.model.assignedTo = '';

      this.assignTicket(() => {
        this.model.assignedToId = oldToId;
        this.model.assignedTo = oldTo;
        this.f.repAssigned.setValue(oldTo);
      });
    }
  }

  getDate(ticks: number): Date {
    return new Date(ticks);
  }

  getUserName(userId: number, userName: string): string {
    if (userName) {
      return userName;
    }
    let result = '';
    if (userId === -1) {
      result = this.model.merchant.firstName + ' ' + this.model.merchant.lastName;
    } else if (userId === this.authService.getUserId()) {
      result = this.authService.getUserName();
    } else {
      // this.usersDataService.getById(userId).subscribe(user => result = user.firstName + ' ' + user.lastName);
    }
    return result;
  }

  getMaxHeight(): number {
    let height = 250;
    if (window.innerHeight > 800) {
      height += window.innerHeight - 800;
    }
    return height;
  }

  attachmentChanged(event) {
    if (event.target.files && event.target.files.length) {
      this.attachmentFileName = event.target.files[0].name;
    } else {
      this.attachmentFileName = this.placeholder;
    }
  }

  attachmentStyle() {
    return {
      'color': this.attachmentFileName === this.placeholder ? '#aaaaaa' : '',
      'text-align': this.attachmentFileName === this.placeholder ? 'right' : 'left',
      'padding-right': this.attachmentFileName === this.placeholder ? '138px' : ''
    };
  }

  downloadAttachment(attachmentId: number, filename: string) {
    this.supportDataService.downloadAttachment(attachmentId, filename);
    return false;
  }
}
