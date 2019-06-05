import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { MerchantDataService } from 'src/app/_services/merchant-data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { HttpClient } from '@angular/common/http';
import { MerchantDetailsModel } from 'src/app/models/merchant-details-model';
import { MerchantModel } from 'src/app/models/merchant-model';
import { OrderSummaryModel } from 'src/app/models/order-summary';
import { OrderDetailModel } from 'src/app/models/order-detail';

@Component({
  selector: 'app-merchant-details-orders',
  templateUrl: './merchant-details-orders.component.html',
  styleUrls: ['./merchant-details-orders.component.scss']
})
export class MerchantDetailsOrdersComponent implements OnInit {
  @Input() id: number;
  @Input() btnTitle = 'View Complete Merchant Details';
  m: MerchantDetailsModel;
  orderSummary: OrderSummaryModel;
  orderDetails: OrderDetailModel[];
  @Input() merchant: MerchantModel;
  @ViewChild('template', { read: TemplateRef }) public tmpl: TemplateRef<any>;
  lgModal: BsModalRef;

  constructor(
    private merchDataService: MerchantDataService,
    private modalService: BsModalService,
    private http: HttpClient) { }

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
      // this.merchDataService.getMerchantDelails(merchant.id).subscribe(m => {
      //   this.m = m;
      //   this.openModal(this.tmpl);
      // });
      this.m = new MerchantDetailsModel();
      this.orderSummary = new OrderSummaryModel();
      this.orderDetails = [
        new OrderDetailModel()
      ];
      this.openModal(this.tmpl);
    }
  }

}
