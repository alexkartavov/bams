import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ValueProcessingService } from 'src/app/_services/value-processing.service';
import { IgxInputGroupComponent, IgxDropDownComponent, OverlaySettings,
  ConnectedPositioningStrategy, NoOpScrollStrategy } from 'igniteui-angular';

@Component({
  selector: 'app-filter-tickets',
  templateUrl: './filter-tickets.component.html',
  styleUrls: ['./filter-tickets.component.scss']
})
export class FilterTicketsComponent implements OnInit {

  @Input()
  public filterMode = '';

  @Input()
  public type = '';
  @Output()
  public typeChange: EventEmitter<string> = new EventEmitter();
  public typeData: string[];

  @Input()
  public status = '';
  @Output()
  public statusChange: EventEmitter<string> = new EventEmitter();
  public statusData: string[];

  @Input()
  public priority = '';
  @Output()
  public priorityChange: EventEmitter<string> = new EventEmitter();
  public priorityData: string[];

  @Output()
  public clearFilters: EventEmitter<any> = new EventEmitter();

  constructor(valueService: ValueProcessingService) {
    this.typeData = valueService.typeData;
    this.statusData = valueService.statusData;
    this.priorityData = valueService.priorityData;
  }

  ngOnInit() {
  }

  isTypeVisible() {
    if (this.filterMode) {
      return this.filterMode.indexOf('type') >= 0;
    }
    return true;
  }

  isStatusVisible() {
    if (this.filterMode) {
      return this.filterMode.indexOf('status') >= 0;
    }
    return true;
  }

  isPriorityVisible() {
    if (this.filterMode) {
      return this.filterMode.indexOf('priority') >= 0;
    }
    return true;
  }

  selectType(i) {
    this.type = this.typeData[i];
    this.typeChange.emit(this.type);
  }

  selectStatus(i) {
    this.status = this.statusData[i];
    this.statusChange.emit(this.status);
  }

  selectPriority(i) {
    this.priority = this.priorityData[i];
    this.priorityChange.emit(this.priority);
  }

  hasFilters(): boolean {
    if (this.priority || this.status || this.type) {
      return true;
    }
    return false;
  }

  clear() {
    if (!this.hasFilters()) {
      return;
    }
    this.type = '';
    this.status = '';
    this.priority = '';

    this.clearFilters.emit();
  }
}
