import { Component, OnInit, Input, EventEmitter, Output, ViewChild, TemplateRef } from '@angular/core';
import { MerchantDataService } from '../../../_services/merchant-data.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { MerchantDetailsModel } from 'src/app/models/merchant-details-model';
import { MerchantModel } from 'src/app/models/merchant-model';

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
  @ViewChild('template', { read: TemplateRef, static: false}) public tmpl: TemplateRef<any>;
  lgModal: BsModalRef;

  constructor(private merchDataService: MerchantDataService, private modalService: BsModalService) { }

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
      this.merchant = merchant;
      this.merchDataService.getMerchantDelails(merchant.id).subscribe(m => {
        this.m = m;
        this.openModal(this.tmpl);
      });
    }
  }
}
