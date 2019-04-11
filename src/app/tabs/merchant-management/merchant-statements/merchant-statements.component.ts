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
  public statements: Observable<any[]>;
  public selectedYear: number;
  public years: Observable<any[]>;

  constructor(private merchDataService: MerchantDataService, private modalService: BsModalService) {
    this.dataSource = new StatementDataSource(merchDataService);
  }

  ngOnInit() {
    this.statements = this.dataSource.connect();
  }

  ngAfterViewInit(): void {
    this.dataSource.loadStatements({
      mid: this.id
    });
    this.years = this.dataSource.getYears();
  }

  ngOnDestroy(): void {

  }

  public openModal(template) {
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
    this.dataSource.loadStatements({
      mid: this.id,
      year: this.selectedYear
    });
  }

}
