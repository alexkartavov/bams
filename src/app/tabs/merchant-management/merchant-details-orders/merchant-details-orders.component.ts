import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { MerchantDataService } from 'src/app/_services/merchant-data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { HttpClient } from '@angular/common/http';
import { MerchantDetailsModel } from 'src/app/models/merchant-details-model';
import { MerchantModel } from 'src/app/models/merchant-model';
import { OrderSummaryModel } from 'src/app/models/order-summary';
import { OrderDetailModel } from 'src/app/models/order-detail';
import { merchantOrderSummary, merchantOrderDetails } from 'src/app/_services/test-data/data.merchant.transactions';

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
      this.orderSummary = merchantOrderSummary;
      this.orderDetails = merchantOrderDetails;
      this.openModal(this.tmpl);
    }
  }

  taxRate(): number {
    return 7;
  }

  totalQty(details: OrderDetailModel[]): number {
    if (!details || details.length === 0) {
      return 0;
    }
    let total = 0;
    details.forEach(e => total += e.quantity);
    return total;
  }

  totalPrice(details: OrderDetailModel[]): number {
    if (!details || details.length === 0) {
      return 0;
    }
    let total = 0;
    details.forEach(e => total += e.quantity * e.price);
    return total;
  }

  grandTotal(details: OrderDetailModel[]): number {
    if (!details || details.length === 0) {
      return 0;
    }
    const total = this.totalPrice(details);
    return total * (1 + this.taxRate() / 100);
  }
}
