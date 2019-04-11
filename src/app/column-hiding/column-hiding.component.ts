import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IgxColumnComponent } from 'igniteui-angular';

@Component({
  selector: 'app-column-hiding',
  templateUrl: './column-hiding.component.html',
  styleUrls: ['./column-hiding.component.scss']
})
export class ColumnHidingComponent implements OnInit {

  @Input() columns: IgxColumnComponent[];
  public checks: boolean[] = [];
  @Output() updated: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.reset();
  }

  update(event) {
    this.checks.forEach((c, i) => {
      this.columns[i].hidden = !c;
    });
    this.updated.emit(this.columns);
  }

  reset() {
    this.columns.forEach((col, i) => {
      this.checks[i] = !col.hidden;
    });
  }

}
