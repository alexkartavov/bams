import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sort-indicator',
  templateUrl: './sort-indicator.component.html',
  styleUrls: ['./sort-indicator.component.scss']
})
export class SortIndicatorComponent implements OnInit {

  @Input() isSorted = false;
  @Input() sortDir = true;
  @Input() left = false;

  constructor() { }

  ngOnInit() {
  }

  upStyles() {
    const style = {
      'position': 'absolute',
      'font-size': 'medium',
      'top': '12px',
      'color': 'lightgray'
    };
    if (this.isSorted && this.sortDir) {
      style['color'] = '#000A23';
    }
    if (this.left) {
      style['left'] = '0px';
    } else {
      style['right'] = '0px';
    }
    return style;
  }

  downStyles() {
    const style = {
      'position': 'absolute',
      'font-size': 'medium',
      'top': '12px',
      'color': 'lightgray'
    };
    if (this.isSorted && !this.sortDir) {
      style['color'] = '#000A23';
    }
    if (this.left) {
      style['left'] = '0px';
    } else {
      style['right'] = '0px';
    }
    return style;
  }
}
