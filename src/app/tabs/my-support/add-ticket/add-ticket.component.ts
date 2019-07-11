import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { SupportTicketModel } from 'src/app/models/support-ticket';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { SupportDataService } from 'src/app/_services/support-data.service';
import { MerchantDataService } from 'src/app/_services/merchant-data.service';
import { MerchantModel } from 'src/app/models/merchant-model';
import { ValueProcessingService } from 'src/app/_services/value-processing.service';
import { Observable } from 'rxjs';
import { MerchantDataSource } from '../../merchant-management/merchant-datasource';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit, OnDestroy {

  modalRef: BsModalRef;
  @Input() model: SupportTicketModel;
  @Input() editable = true;
  @Output() success: EventEmitter <SupportTicketModel> = new EventEmitter();

  public merchDataSource: MerchantDataSource;
  public merchData: Observable<MerchantModel[]>;
  public phoneDataSource: MerchantDataSource;
  public phoneData: Observable<MerchantModel[]>;
  public midDataSource: MerchantDataSource;
  public midData: Observable<MerchantModel[]>;
  public emailDataSource: MerchantDataSource;
  public emailData: Observable<MerchantModel[]>;

  public typeData: string[];
  public priorityData: string[];
  public typeaheadLoading = false;
  private placeholder = '.jpg .gif .jpeg .png .txt .pdf';
  public attachmentFileName: string;
  public submitting = false;

  constructor(private modalService: BsModalService,
    private alertify: AlertifyService,
    private authService: AuthService,
    private supportDataService: SupportDataService,
    private merchDataService: MerchantDataService,
    private valueService: ValueProcessingService,
    private http: HttpClient) {
      this.typeData = valueService.typeData;
      this.priorityData = valueService.priorityData;
      this.merchDataSource = new MerchantDataSource(merchDataService);
      this.phoneDataSource = new MerchantDataSource(merchDataService);
      this.midDataSource = new MerchantDataSource(merchDataService);
      this.emailDataSource = new MerchantDataSource(merchDataService);
      this.attachmentFileName = this.placeholder;
    }

  ngOnInit() {
    this.merchData = this.merchDataSource.connect();
    this.phoneData = this.phoneDataSource.connect();
    this.midData = this.phoneDataSource.connect();
    this.emailData = this.phoneDataSource.connect();
  }

  ngOnDestroy() {
    this.merchDataSource.disconnect();
    this.phoneDataSource.disconnect();
    this.midDataSource.disconnect();
    this.emailDataSource.disconnect();
  }

  openModal(template: BsModalService) {
    this.modalRef = this.modalService.show(template);
  }

  update() {
    this.submitting = true;
    this.supportDataService.createTicket(this.prepareModel(this.model),
      (response) => {
        this.alertify.success('New ticket has been created.');
        if (this.attachmentFileName && this.attachmentFileName !== this.placeholder) {
          const fileChooser = <HTMLInputElement>window.document.getElementById('attachmentFile');
          if (fileChooser.files && fileChooser.files.length > 0) {
            const uploadFile = fileChooser.files.item(0);

            this.supportDataService.uploadAttachment(response.id, uploadFile,
              () => {
                this.hideWithMessage(true, 'Attachment has been uploaded.');
                this.success.emit(this.model);
              },
              (error) => {
                this.hideWithMessage(false, 'Error: ' + error);
              });
          } else {
            this.modalRef.hide();
            this.submitting = false;
            this.success.emit(this.model);
          }
        } else {
          this.modalRef.hide();
          this.submitting = false;
          this.success.emit(this.model);
        }
      },
      (err) => {
        this.hideWithMessage(false, 'Error: ' + err.message);
      });
  }

  hideWithMessage(isSuccess: boolean, message: string) {
    if (isSuccess) {
      this.alertify.success(message);
    } else {
      this.alertify.error(message);
    }
    this.modalRef.hide();
    this.submitting = false;
  }

  prepareModel(m: SupportTicketModel): SupportTicketModel {
    const m1 = Object.assign({}, m);

    m1.type = this.valueService.getTicketTypeValue(m1.type);
    m1.status = this.valueService.getTicketStatusValue(m1.status);
    m1.priority = this.valueService.getTicketPriorityValue(m1.priority);

    m1.title = m.mid + ' / ' + m.type + ' / ' + m.merchant.firstName + ' ' + m.merchant.lastName;

    return m1;
  }

  typeaheadSelect(event) {
    if (event.item) {
      this.model.merchant.dbaName = event.item.dbaName;
      this.model.merchant.firstName = event.item.merchantFirstName;
      this.model.merchant.lastName = event.item.merchantLastName;
      this.model.merchant.phoneNumber = event.item.phoneNumber;
      this.model.merchant.emailAddress = event.item.emailAddress;
      this.model.mid = event.item.midNumber;
      this.model.merchant.channel = this.valueService.platformName(event.item.applicationReferenceNo);
    }
  }

  changeTypeaheadLoading(e: boolean, searchParam: string): void {
    if (e) {
      this.merchDataSource.loadMerchants({
        cepSupportUser: this.authService.getCepSupportUser(),
        listMerchantRequest: {
          search: searchParam,
          page: 0,
          pageSize: 7,
          sortAscending: true,
          sortByName: 'dbaName'
        }
      });
    }
    this.typeaheadLoading = e;
  }

  phoneTypeaheadLoading(e: boolean, searchParam: string): void {
    if (e) {
      this.phoneDataSource.loadMerchants({
        cepSupportUser: this.authService.getCepSupportUser(),
        listMerchantRequest: {
          search: searchParam,
          page: 0,
          pageSize: 7,
          sortAscending: true,
          sortByName: 'phoneNumber'
        }
      });
    }
    this.typeaheadLoading = e;
  }

  midTypeaheadLoading(e: boolean, searchParam: string): void {
    if (e) {
      this.midDataSource.loadMerchants({
        cepSupportUser: this.authService.getCepSupportUser(),
        listMerchantRequest: {
          search: searchParam,
          page: 0,
          pageSize: 7,
          sortAscending: true,
          sortByName: 'midNumber'
        }
      });
    }
    this.typeaheadLoading = e;
  }

  emailTypeaheadLoading(e: boolean, searchParam: string): void {
    if (e) {
      this.emailDataSource.loadMerchants({
        cepSupportUser: this.authService.getCepSupportUser(),
        listMerchantRequest: {
          search: searchParam,
          page: 0,
          pageSize: 7,
          sortAscending: true,
          sortByName: 'emailAddress'
        }
      });
    }
    this.typeaheadLoading = e;
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
}
