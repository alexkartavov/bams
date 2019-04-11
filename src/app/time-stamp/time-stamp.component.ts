import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-stamp',
  templateUrl: './time-stamp.component.html',
  styleUrls: ['./time-stamp.component.scss']
})
export class TimeStampComponent implements OnInit {
  dataUpdatetTime: Date;

  constructor() { }

  ngOnInit() {
    this.dataUpdatetTime = new Date(Date.now());
  }

  getDataUpdateStamp(): string {
    return this.dataUpdatetTime.toLocaleString();
  }

}
