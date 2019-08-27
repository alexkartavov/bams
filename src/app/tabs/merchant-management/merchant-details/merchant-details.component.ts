import { Component, OnInit, Input, EventEmitter, Output, ViewChild, TemplateRef } from '@angular/core';
import { MerchantDataService } from '../../../_services/merchant-data.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { MerchantDetailsModel } from 'src/app/models/merchant-details-model';
import { MerchantModel } from 'src/app/models/merchant-model';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-merchant-details',
  templateUrl: './merchant-details.component.html',
  styleUrls: ['./merchant-details.component.scss']
})
export class MerchantDetailsComponent implements OnInit {
  @Input() id: number;
  @Input() btnTitle = 'View Complete Merchant Details';
  m: MerchantDetailsModel;
  @Input() merchant: MerchantModel;
  @ViewChild('template', { read: TemplateRef }) public tmpl: TemplateRef<any>;
  lgModal: BsModalRef;

  constructor(
    private merchDataService: MerchantDataService,
    private modalService: BsModalService,
    private alertify: AlertifyService) { }

  ngOnInit() {
  }

  public openModal(template) {
    const initialState = {
      id: this.id
    };
    this.lgModal = this.modalService.show(template, {initialState, class: 'modal-lg'});
  }

  public show(merchant: MerchantModel) {
    if (merchant) {
      if (!merchant.midNumber) {
        this.alertify.error('MID number must be assigned to view details.');
        return;
      }
      this.merchant = merchant;
      this.merchDataService.getMerchantDelails(merchant).subscribe(m => {
        this.m = null;
        if (m && m.result) {
          this.m = m.result;
        }
        this.openModal(this.tmpl);
      });
    }
  }
}
