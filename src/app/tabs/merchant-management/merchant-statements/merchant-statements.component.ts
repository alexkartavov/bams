import { Component, OnInit, Input, ViewChild, TemplateRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MerchantModel } from 'src/app/models/merchant-model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { MerchantDataService } from 'src/app/_services/merchant-data.service';
import { Observable } from 'rxjs';
import { StatementDataSource } from './statement-datasource';

@Component({
  selector: 'app-merchant-statements',
  templateUrl: './merchant-statements.component.html',
  styleUrls: ['./merchant-statements.component.scss']
})
export class MerchantStatementsComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() id: number;
  @Input() btnTitle = 'View Complete Merchant Details';
  m = new MerchantModel();
  @ViewChild('template', { read: TemplateRef }) public tmpl: TemplateRef<any>;
  lgModal: BsModalRef;
  dataSource: StatementDataSource;
  public statements = new Observable<any[]>();
  public selectedYear: string;
  public statementYears: number[];

  constructor(private merchDataService: MerchantDataService, private modalService: BsModalService) {

    const now = new Date();
    this.statementYears = [
      now.getFullYear() - 2,
      now.getFullYear() - 1,
      now.getFullYear()
    ];
  }

  ngOnInit() {
    this.dataSource = new StatementDataSource(this.merchDataService);
    this.statements = this.dataSource.connect();
    const now = new Date();
    this.selectedYear = now.getFullYear().toString();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.dataSource.disconnect();
  }

  public openModal(template) {
    this.requestStatements(this.id, this.selectedYear);

    const initialState = {
      id: this.id
    };
    this.lgModal = this.modalService.show(template, {initialState/*, class: 'modal-lg'*/});
  }

  public show(id) {
    if (id) {
      this.merchDataService.getById(id).subscribe(m => {
        this.m = m;
        this.openModal(this.tmpl);
      });
    }
  }

  changeYear() {
    this.requestStatements(this.id, this.selectedYear);
  }

  requestStatements(merchantId: number, year: string) {
    const from = year + '-' + '01-01';
    const to = year + '-' + '12-31';
    this.dataSource.loadStatements({
      merchantId: merchantId,
      dateFrom: from,
      dateTo: to
    });
  }

}
