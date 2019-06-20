import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { PaginationComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {
  @Input() totalCount: number;
  @Input() pageSize = 10;
  @Output() pageChanged: EventEmitter <any> = new EventEmitter();
  @ViewChild('pagination', {static: false}) public pagination: PaginationComponent;
  @Input() set page(value: number) {
    this.pagination.page = value;
  }
  get page(): number {
    return this.pagination.page;
  }

  constructor() { }

  ngOnInit() {
  }

  changed(event) {
    this.pageChanged.emit({ currentPage: event.page - 1 });
  }

  setPage(pageNo) {
    this.pagination.page = pageNo;
  }
}
